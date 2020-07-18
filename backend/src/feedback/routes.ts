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

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const feedback = await Feedback.findById(Id)
        const response = createResponse("OK", feedback, undefined)
        res.json(response)
    })
)

app.post('/', [
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await Feedback.createNew(req.body)
        const response = createResponse("OK", feedback, undefined)
        res.json(response)
    })
)

app.put('/:id', [
    param('id', "id can't be empty").isLength({ min: 1 }),
    body('options', "name can't be empty").optional().isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number;
        const updated = await Feedback.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.params.id as any as number;
        const deleted = await Feedback.deleteById(Id);
        const response = createResponse("OK", "Feedback deleted with id " + Id, undefined)
        res.json(response);
    })
)


app.use(expressErrorHandler);

export default app
