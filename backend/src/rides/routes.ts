import express, { Application, Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import Ride from './service'
import { expressErrorHandler, expressQAsync, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const rides = await Ride.findAll()
        const response = createResponse(200, rides, null)
        res.status(200).send(response)
    })
)

app.get('/:id',
    [param("id", "id is invalid").isLength({ min: 1 }).optional(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const ride = await Ride.findById(Id)
        const response = createResponse(200, ride, null)
        res.json(response)
    })
)

app.post('/',
    [body('name', "name can't be empty").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const newride = await Ride.createNew(req.body)
        const response = createResponse(200, newride, null)
        res.json(response)
    })
)

app.put('/:id', [
    param("id", "id is invalid").isLength({ min: 1 }),
    body('name', "name can't be empty").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await Ride.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)

    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = Number(req.params.id);
        const deleted = await Ride.deleteById(Id);
        const response = createResponse(200, "feature deleted with id " + Id, null)
        res.json(response);
    })
)

app.use(expressErrorHandler)
export default app
