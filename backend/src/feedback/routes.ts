import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Feedback from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await Feedback.findAll()
        const response = createResponse(200, feedback, null)
        res.json(response)
    })
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const feedback = await Feedback.findById(Id)
        const response = createResponse(200, feedback, null)
        res.json(response)
    })
)

app.post('/', [
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await Feedback.createNew(req.body)
        const response = createResponse(200, feedback, null)
        res.json(response)
    })
)

app.put('/:id', [
    body('options', "name can't be empty").isLength({ min: 1 }).optional(),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await Feedback.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = Number(req.params.id);
        const deleted = await Feedback.deleteById(Id);
        const response = createResponse(200, "Feedback deleted with id " + Id, null)
        res.json(response);
    })
)


app.use(expressErrorHandler);

export default app
