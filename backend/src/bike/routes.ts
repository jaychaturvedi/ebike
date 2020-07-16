import express, { Application, Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import Bike from './service'
import localstore from "store";
import ConnectmApi from "../externalApi/motovolt";
import { verifyFrame } from './controller';

const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikes = await Bike.findAll()
        const response = createResponse("OK", bikes, undefined)
        res.json(response)
    })
)

app.get('/', [
    query('frameId', "pass a valid frameId").isLength({ min: 3 }).isString(),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikedetails = await ConnectmApi.getBikeDetails(req.query.frameId as string);
        const response = createResponse("OK", bikedetails, undefined)
        res.json(response)
    })
)
//get uid from local store and secure api
app.get('/verify', expressQAsync(secure), [
    query('frameId', "some message").isLength({ min: 1 }).isString(),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.query
        const uid = localstore.get('user').uid
        const bikedetails = await verifyFrame(uid as string, frameId as string);
        const response = createResponse("OK", bikedetails, undefined)
        res.json(response)
    })
)

app.put('/', expressQAsync(secure), [
    query('bikeName', "bikeName is too short").optional().isString().isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikeName = req.query.bikeName as any as string
        const uid = localstore.get('user').uid
        const updated = await Bike.updateByUid(uid, { bikeName });
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/',
    query('frameId', "frameId is required").notEmpty(),
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.query.frameId as any as number
        const deleted = await Bike.deleteByFrame(Id);
        const response = createResponse("OK", "deleted with id " + Id, undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
