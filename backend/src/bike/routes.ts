import express, { Application, Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import Bike from './service'
import ConnectmApi from "../externalApi/motovolt";
import { verifyFrame, getBikeDetails } from './controller';
import User from '../user/service';

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
app.get('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikedetails = await getBikeDetails(res.locals.users.uid)
        const response = createResponse("OK", bikedetails, undefined)
        res.json(response)
    })
)
//register frameid to user
app.get('/verify/:frameId', expressQAsync(secure), [
    param('frameId', "frameId is required").isString().isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.params as any
        const { uid } = res.locals.user as any
        const bikedetails = await verifyFrame(uid as string, frameId as string);
        const response = createResponse("OK", bikedetails, undefined)
        res.json(response)
    })
)
app.get('/liveLocation/:frameId', expressQAsync(secure),
    [param('frameId', "frameId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.params.frameId as string
        const { lat: latitude, long: longitude, addr: address, utc: lastused } =
            await ConnectmApi.getLiveLocation(frameId as string)
        const response = createResponse("OK", {
            latitude, longitude, address, lastused
        }, undefined)
        res.json(response)
    })
)
//whether to check if notificatin is true or false
app.get('/notification', expressQAsync(secure),
    [body('pageNo', "can't be empty").optional().toInt(),
    body('pageSize', "can't be empty").optional().toInt(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { pageNo, pageSize } = req.body
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const history = await ConnectmApi.getNotification(frameId as string, pageNo as number, pageSize as number)
        const response = createResponse("OK", history, undefined)
        res.json(response)
    })
)
//update bikeName during registration
app.put('/', expressQAsync(secure), [
    body('bikeName', "bikeName is too short").optional().isString().isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikeName = req.body.bikeName as string
        const uid = res.locals.user.uid
        const updated = await Bike.updateWhere({ uid }, { bikeName });
        const response = createResponse("OK", updated, undefined)
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
