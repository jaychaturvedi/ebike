import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { Faq, Upgrades } from "./controller";
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const response = createResponse("OK", Upgrades, undefined)
        res.send(response)
    })
)
app.post('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
      const response = createResponse("OK", Upgrades, undefined)
      res.send(response)
    })
)
app.get('/faq',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const response = createResponse("OK", Faq, undefined)
        res.send(response)
    })
)

app.use(expressErrorHandler);

export default app
