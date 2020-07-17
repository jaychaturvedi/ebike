import express, { Application, Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import Bike from './service'
import ConnectmApi from "../externalApi/motovolt";
import { verifyFrame } from './controller';
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
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const bikedetails = await ConnectmApi.getBikeDetails(frameId as string);
        const response = createResponse("OK", bikedetails, undefined)
        res.json(response)
    })
)
//register frameid to user
app.get('/verify', expressQAsync(secure), [
    query('frameId', "some message").isLength({ min: 1 }).isString(),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.query
        const uid = res.locals.user.uid
        const bikedetails = await verifyFrame(uid as string, frameId as string);
        const response = createResponse("OK", bikedetails, undefined)
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
        const updated = await Bike.updateByUid(uid, { bikeName });
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response) => {
        const { frameId } = await User.findByUid(res.locals.user.uid)
        const deleted = await Bike.deleteByFrame(frameId as string);
        const response = createResponse("OK", "deleted with frameId " + frameId, undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
