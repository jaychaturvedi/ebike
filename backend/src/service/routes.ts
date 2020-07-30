import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { createIssues, closeIssues } from "./controller";
const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.findAllWhere({})
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)

app.get('/open',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.findAllWhere({ status: 0 })
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)

app.get('/close',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.findAllWhere({ status: 1 })
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)

app.get('/:serviceId',
    [param('serviceId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const serviceId = req.params.serviceId as any as string
        const issue = await Issues.findWhere({ serviceId })
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.post('/', expressQAsync(secure),
    [body('comments', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { comments } = req.body
        const issue = await createIssues(res.locals.user.uid, comments as string)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.put('/:serviceId',
    [param('serviceId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const serviceId = req.params.serviceId as any as string
        const issue = await closeIssues(serviceId)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);

export default app
