import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import DbFeedback from "./service"
import {expressQAsync,expressErrorHandler, validate} from '../helper'
const app = express.Router()



// //get All records

// //get All records
app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const feedback = await DbFeedback.findAll()
    const response = { status: "OK", body: feedback, error: null, date: new Date() }
    res.status(200).send(response)

})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const feedback = await DbFeedback.findById(Id)
        const response = { status: "OK", body: feedback, error: null, date: new Date() }
        res.json(response)
    })
)
app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feedback = await DbFeedback.createNew(req.body)
        const response = { status: "OK", body: feedback, error: null, date: new Date() }
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await DbFeedback.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)

    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    const deleted = await DbFeedback.deleteById(Id);
    return res.json("Feedback deleted with id " + Id);
})
)


app.use(expressErrorHandler);

export default app
