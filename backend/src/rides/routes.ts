import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import localstore from 'store'
import { expressErrorHandler, expressQAsync, validate, createResponse, secure } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { getNewRide, getEndRide, rateYourRide } from "./controller";
const app = express.Router()

//home screen
app.get('/home',
    [query("frameId", "frameId is requires").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.query.frameId as any as string
        const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
            grnmls: greenMiles, costrcv: costRecovered } =
            await ConnectmApi.getRideStats(frameId)
        const { batchrg: batteryCharge, rngcrv: rangeCovered, rngavail: rangeAvailable } =
            await ConnectmApi.getCurrentRideDetails(frameId)//get LiveBikeData
        const response = createResponse("OK", {
            co2sav, totalDistance, ratings, petrolSaved,
            greenMiles, costRecovered, batteryCharge, rangeCovered, rangeAvailable
        }, undefined)
        res.json(response)
    })
)
//start a new ride
app.get('/newride', expressQAsync(secure),
    [query("frameId", "frameId is requires").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.query.frameId as any as string
        const newride = await getNewRide(frameId)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)
//end a ride
app.get('/endride', expressQAsync(secure),
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, startTime, endTime } = req.query
        const uid = localstore.get('user').uid
        const newride = await getEndRide(frameId as string, startTime as string, endTime as string, uid)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)
//update rating of a ride
app.get('/rating', expressQAsync(secure),
    [query('startTime', "can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "can't be empty").isString().isLength({ min: 1 }),
    query('rating', "can't be empty").isLength({ min: 1 }).toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { startTime, endTime, rating } = req.query as any
        const uid = localstore.get('user').uid
        const newride = await rateYourRide(uid as string, startTime as string,
            endTime as string, rating as number)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.get('/livelocation',
    [query('frameId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lat: latitude, long: longitude, addr: address, utc: lastused } =
            await ConnectmApi.getCurrentLocation(req.query.frameId as string)
        const response = createResponse("OK", {
            latitude, longitude, address, lastused
        }, undefined)
        res.json(response)
    })
)


app.get('/ridepath',
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, startTime, endTime } = req.query
        const ridepath = await ConnectmApi.getLocationHistory(frameId as string, startTime as string, endTime as string)
        const response = createResponse("OK", ridepath, undefined)
        res.json(response)
    })
)
//need to get from model
app.get('/myrides',
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.query
        const ridepath = await ConnectmApi.getRideHistory(frameId as string)
        const response = createResponse("OK", ridepath, undefined)
        res.json(response)
    })
)

app.get('/ridedetails',
    [query('frameId', "name can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "name can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, startTime, endTime } = req.query
        const newride = await getEndRide(frameId as string, startTime as string, endTime as string)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)


app.use(expressErrorHandler)
export default app
