import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { createIssues, closeIssues, paginate } from "./controller";
const app = express.Router()

app.get('/all/', expressQAsync(secure),
    [query('pageNo', "pageNo. be empty").optional().toInt().isLength({ min: 1 }),
    query('pageSize', "pageSize is empty").optional().toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const status = req.params.status ? 1 : 0
        const { pageNo, pageSize } = req.query as any
        const open = await paginate(pageNo as number, pageSize as number, { status: 0 })
        const closed = await paginate(pageNo as number, pageSize as number, { status: 1 })
        const response = createResponse("OK", { open, closed }, undefined)
        res.send(response)
    })
)
//get single job
app.get('/:serviceId', expressQAsync(secure),
    [param('serviceId', "serviceId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const serviceId = req.params.serviceId as any as string
        const issue = await Issues.findWhere({ serviceId })
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.post('/', expressQAsync(secure),
    [body('frameId', "frameId can't be empty").isString().isLength({ min: 1 }),
    body('comments', "comments can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { comments, frameId } = req.body
        const issue = await createIssues(res.locals.user.uid, frameId, comments as string)//one more field of frameId
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.put('/', expressQAsync(secure),
    [body('status', "status can't be empty").toInt().isLength({ min: 1 }),
    body('serviceId', "serviceId can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { serviceId, status } = req.body
        const issue = await closeIssues(serviceId, status as number)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);

export default app
