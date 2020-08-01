import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { createIssues, closeIssues, paginate } from "./controller";
const app = express.Router()

app.get('/all', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.findAllWhere({})
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)
//get open or closed jobs
app.post('/jobs/', expressQAsync(secure),
    [body('pageNo', "can't be empty").toInt().isLength({ min: 1 }),
    body('pageSize', "can't be empty").toInt().isLength({ min: 1 }),
    body('status', "can't be empty").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const status = req.body.status ? 1 : 0
        const { pageNo, pageSize } = req.body
        const issue = await paginate(pageNo, pageSize, { status })
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)
//get single job
app.get('/:serviceId', expressQAsync(secure),
    [param('serviceId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const serviceId = req.params.serviceId as any as string
        const issue = await Issues.findWhere({ serviceId })
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.post('/', expressQAsync(secure),
    [body('frameId', "can't be empty").isString().isLength({ min: 1 }),
    body('comments', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { comments, frameId } = req.body
        const issue = await createIssues(res.locals.user.uid, frameId, comments as string)//one more field of frameId
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.put('/', expressQAsync(secure),
    [body('status', "status can't be empty").toInt().isLength({ min: 1 }),
    body('serviceId', "serviceIdcan't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { serviceId, status } = req.body
        const issue = await closeIssues(serviceId, status as number)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);

export default app
