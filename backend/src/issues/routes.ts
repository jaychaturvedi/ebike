import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Issues from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
import { createIssues } from "./controller";
const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const issue = await Issues.findAll()
        const response = createResponse("OK", issue, undefined)
        res.send(response)
    })
)

app.get('/:rideId',
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const rideId = req.params.rideId as any as string
        const issue = await Issues.findById(rideId)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)
app.post('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { rideId, comments } = req.body
        const issue = await createIssues(rideId, comments)
        const response = createResponse("OK", issue, undefined)
        res.json(response)
    })
)

app.delete('/:rideId',
    [body('rideId', "can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response) => {
        const rideId = req.params.rideId as any as string
        const deleted = await Issues.deleteWhere({ rideId });
        const response = createResponse("OK", "issue deleted with id " + rideId, undefined)
        res.json(response);
    })
)


app.use(expressErrorHandler);

export default app
