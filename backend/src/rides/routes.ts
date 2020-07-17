import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { getNewRide, getEndRide, rateYourRide } from "./controller";
import User from "../user/service";
const app = express.Router()

//home screen
app.get('/home', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
            grnmls: greenMiles, costrcv: costRecovered } =
            await ConnectmApi.getRideStats(frameId as string)
        const { batchrg: batteryCharge, rngcrv: rangeCovered, rngavail: rangeAvailable } =
            await ConnectmApi.getCurrentRideDetails(frameId as string)//get LiveBikeData
        const response = createResponse("OK", {
            co2sav, totalDistance, ratings, petrolSaved,
            greenMiles, costRecovered, batteryCharge, rangeCovered, rangeAvailable
        }, undefined)
        res.json(response)
    })
)
//start a new ride with rideId
app.get('/newRide', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const newride = await getNewRide(frameId as string)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)
//while ending a ride, store it in databasse
app.post('/endRide', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }),
    body('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    body('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, rideId } = req.body
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const newride = await getEndRide(frameId as string, startTime as string,
            endTime as string, rideId as string)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)
//update rating of a ride
app.put('/rating', expressQAsync(secure),
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }),
    body('rating', "can't be empty").isLength({ min: 1 }).toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId, rating } = req.body
        const newride = await rateYourRide(rideId as string, rating as number)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.get('/liveLocation', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const { lat: latitude, long: longitude, addr: address, utc: lastused } =
            await ConnectmApi.getCurrentLocation(frameId as string)
        const response = createResponse("OK", {
            latitude, longitude, address, lastused
        }, undefined)
        res.json(response)
    })
)

app.get('/gpsPath', expressQAsync(secure),
    [query('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime } = req.query
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const ridepath = await ConnectmApi.getLocationHistory(frameId as string, startTime as string, endTime as string)
        const response = createResponse("OK", ridepath, undefined)
        res.json(response)
    })
)
//yantra will add more fields, code later to be changed
app.get('/history', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const history = await ConnectmApi.getRideHistory(frameId as string)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//single ride history details
app.get('/details', expressQAsync(secure),
    [query('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, startTime, endTime } = req.query
        const uid = res.locals.user.uid
        const condition = { where: { uid, startTime, endTime } }
        const newride = await Ride.findOne(condition)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)


app.use(expressErrorHandler)
export default app
