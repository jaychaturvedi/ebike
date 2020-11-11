import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { createNewRide, endRide, updateFeedback, getSpeedometer, rideDetail, } from "./controller";
import { RideError, BadRequestError } from "../error";
const app = express.Router()

app.get('/all', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const issue = await Ride.findAll()
    const response = createResponse("OK", issue, undefined)
    res.send(response)
})
)

//speedometer and other details
app.get('/speedometer/:rideId', expressQAsync(secure),
    [param('rideId', "rideId be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req for speedometer", req.params);
        const speedometer = await getSpeedometer(req.params.rideId)
        console.log("End Time:", new Date())
        const response = createResponse("OK", speedometer, undefined)
        res.json(response)
    })
)

//update rating and feedbacks of a ride
app.put('/rating/:rideId', expressQAsync(secure),
    [param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }),
    body('rating', "rating can't be empty").toInt().isLength({ min: 1 }),
    body('option', "option can't be empty").optional(),
    body('comment', "comment can't be empty").optional(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req for rating", req.params, req.body);
        const { rating, option, comment } = req.body
        const newride = await updateFeedback(req.params.rideId,
            rating as number, option as any, comment as string)
        console.log("End Time:", new Date())
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

//get graph data points and other values, this route is not used
app.get('/graphData/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    query('pageNo', "pageNo can't be empty").optional().toInt(),
    query('pageSize', "pageSize can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize } = req.query as any
        const history = await ConnectmApi.getRideHistoryStat(req.params.frameId, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        if (history[0]?.st) throw new BadRequestError("No data available for the device")
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//single ride history details
app.get('/detail/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    query('tripId', "tripId can't be empty").isString(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req for ride detail", req.params, req.query);
        const { startTime, endTime, tripId } = req.query as any
        const newride = await rideDetail(req.params.frameId, startTime, endTime, tripId)
        const response = createResponse("OK", newride, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)

//start a new ride with rideId
app.get('/:frameId', expressQAsync(secure),
    [query('rideId', "rideId is empty").isString().isLength({ min: 1 }),
    query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    param('frameId', "frameId is empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params);
        const { frameId } = req.params
        const { uid } = res.locals.user
        // const { ign: ignition, lc: locked, st, fid } = await ConnectmApi.getBikeLiveData(frameId)
        // if (st) throw new BadRequestError("No data available for frameId")
        // let newride = {}
        // if (!locked && ignition) {//if bike is on then only start a ride
        // }
        console.log("Start Time:", new Date(), "req for new ride",
            req.params, req.query, res.locals.user);
        const newride = await createNewRide(uid, frameId,
            req.query.rideId as string, req.query.startTime as string)
        const response = createResponse("OK", newride, undefined)//send locked state and send starttime
        console.log("End Time:", new Date())
        res.json(response)
    })
)

//ending a ride, update endtime in databasse
app.put('/:rideId', expressQAsync(secure),
    [param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req for end ride", req.params);
        const ride = await endRide(req.params.rideId as string, req.query.endTime as string)
        const response = createResponse("OK", ride, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)


app.use(expressErrorHandler)
export default app
