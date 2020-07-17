import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const issue = await Issues.findAll()
    const response = createResponse("OK", issue, undefined)
    res.send(response)
})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const issue = await Issues.findById(Id)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)
app.post('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.createNew(req.body)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.put('/:id', [
    body('frameId', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const updated = await Issues.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {
    const Id = req.params.id as any as number
    const deleted = await Issues.deleteById(Id);
    const response = createResponse("OK", "Feedback deleted with id " + Id, undefined)
    res.json(response);
})
)


app.use(expressErrorHandler);

export default app
