import express, { Application, Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse } from '../helper'
import ConnectmApi from "../externalApi/motovolt";
import { isString } from "util";
import { getNewRide, getEndRide, rateYourRide } from "./controller";
const app = express.Router()

//home screen
app.get('/home',
    [query("frameId", "frameId is requires").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.query.frameId as any as string
        const { co2sav, totdist, rats, petlsav, grnmls, costrcv } = await ConnectmApi.getRideStats(frameId)
        const { batchrgper, rngcvr, rngavail } = await ConnectmApi.getBikeLiveData(frameId)
        const response = createResponse("OK", {
            co2sav, totdist, rats, petlsav,
            grnmls, costrcv, batchrgper, rngcvr, rngavail
        }, undefined)
        res.json(response)
    })
)
//start a new ride
app.get('/newride',
    [query("frameId", "frameId is requires").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.query.frameId as any as string
        const newride = await getNewRide(frameId)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)
//end a ride
app.get('/endride',
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
//update rating of a ride
app.put('/rating',
    [query('frameId', "can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "can't be empty").isString().isLength({ min: 1 }),
    query('rating', "can't be empty").isLength({ min: 1 }).toInt(),
        validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, startTime, endTime, rating } = req.query
        const newride = await rateYourRide(frameId as string, startTime as string,
            endTime as string, rating as any as number)
        const response = createResponse("OK", newride, undefined)
        res.json(response)
    })
)

app.get('/livelocation',
    [query('frameId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lat: latitude, long: longitude, addr: address, utc: lastused } = await ConnectmApi.getCurrentLocation(req.query.frameId as string)
        const response = createResponse("OK", { latitude, longitude, address, lastused }, undefined)
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
