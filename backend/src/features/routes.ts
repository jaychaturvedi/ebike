import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import {  UpgradesList, createNewUpgrade, findAllUpgrades, deleteUpgrade, initNewUpgradeList } from "./controller";
const app = express.Router()

app.get('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUpgrades = await findAllUpgrades()
    const response = createResponse("OK", allUpgrades, undefined)
    res.send(response)
  })
)

app.post('/init',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUpgrades = await initNewUpgradeList()
    console.log(allUpgrades);
    const response = createResponse("OK", allUpgrades, undefined)
    res.send(response)
  })
)

app.post('/',
  [body('id', "id can't be empty").toInt(),
  body('price', "price can't be empty").toInt(),
  body('name', "name can't be empty").isString().isLength({ min: 1 }),
  body('icon', "icon can't be empty").isString().isLength({ min: 1 }),
    validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id, price, name, icon } = req.body
    const newUpgrade = await createNewUpgrade(id as number, name, icon, price as number)//one more field of frameId
    const response = createResponse("OK", newUpgrade, undefined)
    res.send(response)
  })
)

app.delete('/',
  [body('name', "name can't be empty").isString().isLength({ min: 1 }),
    validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUpgrade(req.body.name)
    const response = createResponse("OK", "upgrade deleted successfully", undefined)
    res.send(response)
  })
)

app.use(expressErrorHandler);

export default app
