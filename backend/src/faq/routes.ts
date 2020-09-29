import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import Faq from './service'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const faqs = await Faq.findAll()
        const response = createResponse("OK", { sections: faqs }, undefined)
        res.send(response)
    })
)

app.post('/',
    [body('id', "id is too short").toInt().isLength({ min: 1 }),
    body('name', "name can't be empty").isString().isLength({ min: 1 }),
    body('icon', "icon url can't be empty").isString().isLength({ min: 1 }),
    body('faq', "faq array can't be empty").isArray(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id, name, icon, faq } = req.body
        const faqs = await Faq.createNew({ id, name, icon, faq })
        const response = createResponse("OK", faqs, undefined)
        res.send(response)
    })
)

app.delete('/',
    [body('id', "id is too short").toInt().isLength({ min: 1 }),
    body('name', "name can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id, name, icon, faq } = req.body
        const faqs = await Faq.deleteWhere({ id, name })
        const response = createResponse("OK", "deleted", undefined)
        res.send(response)
    })
)

app.delete('/id/:id',
    [param('id', "id is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as any as number
        await Faq.deleteWhere({ id })
        const response = createResponse("OK", "deleted successfully", undefined)
        res.send(response)
    })
)


app.use(expressErrorHandler);

export default app
