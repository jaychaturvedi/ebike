import express, { Application, Request, Response, NextFunction } from 'express';
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
import Bike from './service'
import ConnectmApi from "../externalApi/motovolt";
import { verifyFrame } from './controller';

const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikes = await Bike.findAll()
        const response = createResponse(200, bikes, null)
        res.json(response)
    })
)

app.get('/', [
    query('frameId', "pass a valid frameId").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const bikedetails = await ConnectmApi.getBikeDetails(req.query.frameId as string);
        const response = createResponse(200, bikedetails, null)
        res.json(response)
    })
)

app.get('/verify', [
    query('frameId', "some message").isLength({ min: 1 }).toString,
    query('uid', "some message").isLength({ min: 1 }).toString,
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId, uid } = req.query
        const bikedetails = await verifyFrame(uid as string, frameId as string);
        const response = createResponse(200, bikedetails, null)
        res.json(response)
    })
)

app.put('/:frameId', [
    body('bikeName', "bikeName is too short").isLength({ min: 3 }).optional(),
    param('frameId', "frameId is required").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const frameId = req.params.frameId;
        const bikeName = req.body.bikeName as string
        const updated = await Bike.updateByFrame(frameId, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

app.delete('/:id',
    param('frameId', "frameId is is required").isLength({ min: 1 }),
    expressQAsync(async (req: Request, res: Response) => {
        const Id = Number(req.params.id)
        const deleted = await Bike.deleteById(Id);
        const response = createResponse(200, "deleted with id " + Id, null)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
