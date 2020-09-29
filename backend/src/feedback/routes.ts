import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Feedback from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await Feedback.findAll()
        const response = createResponse("OK", feedback, undefined)
        res.json(response)
    })
)

app.get('/:rideId',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.rideId as string
        const feedback = await Feedback.findById(Id)
        const response = createResponse("OK", feedback, undefined)
        res.json(response)
    })
)

app.post('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await Feedback.createNew(req.body)
        const response = createResponse("OK", feedback, undefined)
        res.json(response)
    })
)

app.put('/:rideId', [
    param('rideId', "rideId can't be empty").isLength({ min: 1 }),
    body('options', "options list can't be empty").optional(),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const rideId = req.params.rideId as string;
        const updated = await Feedback.updateById(rideId, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/:rideId',
    [param('rideId', "rideId can't be empty").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response) => {
        const rideId = req.params.rideId as string;
        const deleted = await Feedback.deleteById(rideId);
        const response = createResponse("OK", "Feedback deleted ", undefined)
        res.json(response);
    })
)


app.use(expressErrorHandler);

export default app
