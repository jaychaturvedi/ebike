import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { createNewRide, endRide, updateFeedback, getSpeedometer, rideDetail, } from "./controller";
import User from "../user/service";
import { RideError } from "../error";
const app = express.Router()

app.get('/all', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const issue = await Ride.findAll()
    const response = createResponse("OK", issue, undefined)
    res.send(response)
})
)
//start a new ride with rideId
app.get('/:frameId', expressQAsync(secure),
    [query('rideId', "rideId is empty").isString().isLength({ min: 1 }),
    param('frameId', "frameId is empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.params
        const { uid } = res.locals.user
        const { ign: ignition, lc: locked } = await ConnectmApi.getBikeLiveData(frameId)
        let newride = {}
        if (!locked && ignition) {//if bike is on then only start a ride
            newride = await createNewRide(uid, frameId, req.query.rideId as string)
        }
        const response = createResponse("OK", newride, undefined)//send locked state and send starttime
        res.json(response)
    })
)

//speedometer and other details
app.get('/speedometer/:rideId', expressQAsync(secure),
    [param('rideId', "rideId be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const speedometer = await getSpeedometer(req.params.rideId)
        const response = createResponse("OK", speedometer, undefined)
        res.json(response)
    })
)

//ending a ride, update endtime in databasse
app.put('/:rideId', expressQAsync(secure),
    [param('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const ride = await endRide(req.params.rideId)
        const response = createResponse("OK", ride, undefined)
        res.json(response)
    })
)

//update rating and feedbacks of a ride
app.put('/rating/:rideId', expressQAsync(secure),
    [param('rideId', "can't be empty").isString().isLength({ min: 1 }),
    body('rating', "can't be empty").isLength({ min: 1 }).toInt(),
    body('option', "can't be empty").optional(),
    body('comment', "can't be empty").optional(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rating, option, comment } = req.body
        const newride = await updateFeedback(req.params.rideId, rating as number, option as any, comment as string)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

//get graph data points and other values
app.get('/graphData/:frameId', expressQAsync(secure),
    [param('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "can't be empty").isString().isLength({ min: 1 }),
    query('pageNo', "can't be empty").optional().toInt(),
    query('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize } = req.query as any
        const history = await ConnectmApi.getRideHistoryStat(req.params.frameId, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//single ride history details
app.get('/detail/:frameId', expressQAsync(secure),
    [param('frameId', "name can't be empty").isString(),
    query('startTime', "can't be empty").isString(),
    query('endTime', "can't be empty").isString(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime } = req.query as any
        const newride = await rideDetail(req.params.frameId, startTime, endTime)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler)
export default app


// app.get('/gpsPath/:rideId', expressQAsync(secure),
//     [param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }), validate],
//     expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const { rideId } = req.params as any
//         const { frameId, startTime, endTime } = await Ride.findOneWhere({ rideId })
//         const ridepath = await ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string)
//         const response = createResponse("OK", ridepath, undefined)
//         res.json(response)
//     })
// )