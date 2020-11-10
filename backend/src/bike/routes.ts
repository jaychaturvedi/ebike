import express, { Application, Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import Bike from './service'
import ConnectmApi from "../externalApi/motovolt";
import { verifyFrame, getMyBike, homeScreen, getRideHistory } from './controller';
import User from '../user/service';
import { BikeError, BadRequestError } from '../error';

const app = express.Router()
//to be removed, just for testing
app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikes = await Bike.findAll()
        const response = createResponse("OK", bikes, undefined)
        res.json(response)
    })
)

//get bike details
app.get('/myBike/:frameId', expressQAsync(secure),
    [param('frameId', "frameId is required").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "request body", req.params)
        console.log("req params in mybike", req.params);
        const bikedetails = await getMyBike(req.params.frameId)
        const response = createResponse("OK", bikedetails, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)

//register frameid to user
app.get('/verify/:frameId', expressQAsync(secure),
    [param('frameId', "frameId is required").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = res.locals.user as any
        console.log("Start Time:", new Date(), "request", req.params, user)
        const bikedetails = await verifyFrame(user as object, req.params.frameId);
        const response = createResponse("OK", bikedetails, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)
//bikes live location
app.get('/liveLocation/:frameId', expressQAsync(secure),
    [param('frameId', "frameId is required").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "request  for live location", req.params)
        const { lat: latitude, long: longitude, addr: address, utc: lastused } =
            await ConnectmApi.getLiveLocation(req.params.frameId)
        const response = createResponse("OK", {
            latitude, longitude, address, lastused
        }, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)
//ride history and graph data
app.get('/history/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    query('startTime', "startTime can't be empty").isString().isLength({ min: 1 }),
    query('endTime', "endTime can't be empty").isString().isLength({ min: 1 }),
    query('pageNo', "pageNo can't be empty").optional().toInt(),
    query('pageSize', "pageSize can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req in history", req.query, req.params);
        const { startTime, endTime, pageNo, pageSize } = req.query as any
        const history = await getRideHistory(req.params.frameId, startTime as string,
            endTime as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)

//whether to check if notificatin is true or false
app.get('/notification/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    query('pageNo', "pageNo can't be empty").optional().toInt(),
    query('pageSize', "pageSize can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { pageNo, pageSize } = req.query as any
        console.log("Start Time:", new Date(), "req in notification", req.query, req.params);
        const notification = await ConnectmApi.getNotification(req.params.frameId, pageNo as number, pageSize as number)
        console.log("End Time:", new Date())
        // if (!notification?.length || notification[0]?.st) return []
        const response = createResponse("OK", notification, undefined)
        res.json(response)
    })
)
//home screen
app.get('/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("Start Time:", new Date(), "req for home", req.params);
        const frameId = req.params.frameId as string
        const body = await homeScreen(frameId)
        const response = createResponse("OK", body, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)

//update bikeName during registration
app.put('/', expressQAsync(secure),
    [body('bikeName', "bikeName is too short").optional().isString().isLength({ min: 1 }),
    body('frameId', "frameId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { bikeName, frameId } = req.body
        console.log("Start Time:", new Date(), "req for update bike", req.body);
        const { uid } = await Bike.updateWhere({ frameId }, { bikeName });
        const response = createResponse("OK", { uid, frameId, bikeName }, undefined)
        console.log("End Time:", new Date())
        res.json(response)
    })
)

app.delete('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response) => {
        const deleted = await Bike.deleteWhere({ uid: res.locals.user.uid });
        const response = createResponse("OK", "deleted", undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
