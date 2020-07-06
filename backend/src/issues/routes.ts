import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import DbIssues from "./service"
import {expressQAsync,expressErrorHandler, validate} from '../helper'
const app = express.Router()

app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const issue = await DbIssues.findAll()
    const response = { status: "OK", body: issue, error: null, date: new Date() }
    res.status(200).send(response)

})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const issue = await DbIssues.findById(Id)
        const response = { status: "OK", body: issue, error: null, date: new Date() }
        res.json(response)
    })
)
app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await DbIssues.createNew(req.body)
        const response = { status: "OK", body: issue, error: null, date: new Date() }
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await DbIssues.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)

    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    const deleted = await DbIssues.deleteById(Id);
    return res.json("Feedback deleted with id " + Id);
})
)


app.use(expressErrorHandler);

export default app
