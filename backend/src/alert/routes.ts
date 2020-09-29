import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import SmartAlert from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
import { searchById } from "./controller";

const app = express.Router()

app.get('/all',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alerts = await SmartAlert.findAll({})
    const response = createResponse("OK", alerts.rows, undefined)
    res.json(response)
  })
)

app.get('/byModel',
  [query('model', "model is empty").isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alerts = await SmartAlert.findByModel(req.query.model as string)
    const response = createResponse("OK", alerts, undefined)
    res.json(response)
  })
)

app.get('/byDate',
  [query("startDate", "startDate is empty").isLength({ min: 1 }),
  query('endDate', "endDate is empty").optional().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updated = await SmartAlert.findByDate(req.query.startDate as string, req.query.endDate as string);
    const response = createResponse("OK", updated, undefined)
    res.json(response)
  })
)

app.get('/byLocation',
  [query('location', "choose a location").isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const alerts = await SmartAlert.findByLocation(req.query.location as string)
    const response = createResponse("OK", alerts, undefined)
    res.json(response)
  })
)

app.get('/search',
  [query('id', "search by id").isLength({ min: 1 }),
  query('limit', "number of rows per page").exists().toInt(),
  query('page', "current page number").exists().toInt(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { limit, page, id } = req.query
    const alerts = await searchById(id as string, limit as any as number, page as any as number)
    const response = createResponse("OK", alerts, undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app



