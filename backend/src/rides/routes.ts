import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { createNewRide, endRide, updateFeedback, getSpeedometer, rideDetail, } from "./controller";
import User from "../user/service";
const app = express.Router()



app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const issue = await Ride.findAll()
    const response = createResponse("OK", issue, undefined)
    res.send(response)
})
)
//start a new ride with rideId
app.post('/', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }),
    body('frameId', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId, frameId } = req.body
        const { uid } = res.locals.user.uid
        const { ign: ignition, lc: locked } = await ConnectmApi.getBikeLiveData(frameId as string)
        let newride = {}
        if (!locked && ignition) {//if bike is on then only start a ride
            newride = await createNewRide(uid, frameId, rideId)
        }
        const response = createResponse("OK", newride, undefined)//send locked state and send starttime
        res.json(response)
    })
)

//speedometer and other details
app.get('/', expressQAsync(secure),
    [query('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.query as any
        const speedometer = rideId ? await getSpeedometer(rideId as string) : 'unable to start a ride'
        const response = createResponse("OK", speedometer, undefined)
        res.json(response)
    })
)

//ending a ride, update endtime in databasse
app.put('/', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.body
        const ride = await endRide(rideId as string)
        const response = createResponse("OK", ride, undefined)
        res.json(response)
    })
)

app.get('/gpsPath/:rideId', expressQAsync(secure),
    [param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.params as any
        const { frameId, startTime, endTime } = await Ride.findOneWhere({ rideId })
        const ridepath = await ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string)
        const response = createResponse("OK", ridepath, undefined)
        res.json(response)
    })
)

//update rating and feedbacks of a ride
app.put('/rating', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }),
    body('rating', "can't be empty").isLength({ min: 1 }).toInt(),
    body('option', "can't be empty").optional(),
    body('comment', "can't be empty").optional(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId, rating, option, comment } = req.body
        const newride = await updateFeedback(rideId as string, rating as number, option as any, comment as string)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.get('/history', expressQAsync(secure),
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "can't be empty").isString().isLength({ min: 1 }),
    query('pageNo', "can't be empty").optional().toInt(),
    query('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize, frameId } = req.query as any
        const history = await ConnectmApi.getRideHistory(frameId as string, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//get graph data points and other values
app.post('/graphData', expressQAsync(secure),
    [body('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    body('startTime', "can't be empty").isString().isLength({ min: 1 }),
    body('endTime', "can't be empty").isString().isLength({ min: 1 }),
    body('pageNo', "can't be empty").optional().toInt(),
    body('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize, frameId } = req.body
        const history = await ConnectmApi.getRideHistoryStat(frameId as string, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//single ride history details
app.get('/detail', expressQAsync(secure),
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, frameId } = req.body
        const newride = await rideDetail(frameId, startTime, endTime)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler)
export default app
