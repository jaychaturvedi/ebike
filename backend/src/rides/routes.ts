import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { getNewRide, getEndRide, updateFeedback, getSpeedometer, } from "./controller";
import User from "../user/service";
const app = express.Router()

//home screen
app.get('/:frameId', expressQAsync(secure),
    [param('frameId', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.params.frameId as string
        const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
            grnmls: greenMiles, costrcv: costRecovered } =
            await ConnectmApi.getBikeStat(frameId as string)
        const { batchrgper: batteryCharge, rngcrv: rangeCovered, rngavail: rangeAvailable } =
            await ConnectmApi.getCurrentRide(frameId as string)//get LiveBikeData
        const response = createResponse("OK", {
            co2sav, totalDistance, ratings, petrolSaved,
            greenMiles, costRecovered, batteryCharge, rangeCovered, rangeAvailable
        }, undefined)
        res.json(response)
    })
)

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
        const newride = await getNewRide(uid, frameId, rideId)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

//speedometer and other details
app.get('/', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.body
        const speedometer = await getSpeedometer(rideId as string)
        const response = createResponse("OK", speedometer, undefined)
        res.json(response)
    })
)

//ending a ride, update endtime in databasse
app.put('/', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, rideId } = req.body
        const endRide = await getEndRide(rideId as string)
        const response = createResponse("OK", endRide, undefined)
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
        const newride = await updateFeedback(rideId as string, rating as number, option as any, comment)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.get('/gpsPath/:rideId', expressQAsync(secure),
    [param('rideId', "rideId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.params as any
        const { frameId, startTime, endTime } = await Ride.findOne({ rideId })
        const ridepath = await ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string)
        const response = createResponse("OK", ridepath, undefined)
        res.json(response)
    })
)
//yantra will add more fields, code later to be changed
app.get('/history', expressQAsync(secure),
    [body('startTime', "can't be empty").isString().isLength({ min: 1 }),
    body('endTime', "can't be empty").isString().isLength({ min: 1 }),
    body('pageNo', "can't be empty").optional().toInt(),
    body('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize } = req.body
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const history = await ConnectmApi.getRideHistory(frameId as string, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//get graph data points and other values
app.get('/graphData', expressQAsync(secure),
    [body('startTime', "can't be empty").isString().isLength({ min: 1 }),
    body('endTime', "can't be empty").isString().isLength({ min: 1 }),
    body('pageNo', "can't be empty").optional().toInt(),
    body('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, pageNo, pageSize } = req.body
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const history = await ConnectmApi.getRideHistoryStat(frameId as string, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//single ride history details
app.get('/details', expressQAsync(secure),
    [param('rideId', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId } = req.param as any
        const condition = { where: { rideId } }
        const newride = await Ride.findOne(condition)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)


app.use(expressErrorHandler)
export default app
