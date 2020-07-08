import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const issue = await Issues.findAll()
    const response = createResponse(200, issue, null)
    res.send(response)
})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const issue = await Issues.findById(Id)
        const response = createResponse(200, issue, null)
        res.json(response)
    })
)
app.post('/', [
    body('frameId', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const issue = await Issues.createNew(req.body)
        const response = createResponse(200, issue, null)
        res.json(response)
    })
)

app.put('/:id', [
    body('frameId', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id);
        const updated = await Issues.updateById(Id, req.body);
        const response = createResponse(200, updated, null)

        res.json(response)
    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    const deleted = await Issues.deleteById(Id);
    const response = createResponse(200,"Feedback deleted with id " + Id, null)
    res.json(response);
})
)


app.use(expressErrorHandler);

export default app
