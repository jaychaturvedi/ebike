import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { createNewFaqQnA, deleteUpgrade, findAllUpgrades, initNewFaqQnA } from "./controller";
const app = express.Router()

app.get('/',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUpgrades = await findAllUpgrades()
    console.log(allUpgrades);
    const response = createResponse("OK", allUpgrades, undefined)
    res.send(response)
  })
)

app.post('/',
  [body('id', "id can't be empty").toInt(),
  body('faqId', "faqId can't be empty").toInt(),
  body('Question', "Question can't be empty").isString().isLength({ min: 1 }),
  body('Answer', "Answer can't be empty").isString().isLength({ min: 1 }),
    validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id, faqId, Question, Answer } = req.body
    const newUpgrade = await createNewFaqQnA(id as number, faqId as number, Question, Answer)//one more field of frameId
    const response = createResponse("OK", newUpgrade, undefined)
    res.send(response)
  })
)

app.get('/init',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allFaqs = await initNewFaqQnA()
    console.log(allFaqs);
    const response = createResponse("OK", allFaqs, undefined)
    res.send(response)
  })
)

app.delete('/',
  [body('id', "id can't be empty").toInt(),
  body('faqId', "faqId can't be empty").toInt(),
    validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUpgrade(req.body.id as number, req.body.faqId as number)
    const response = createResponse("OK", "upgrade deleted successfully", undefined)
    res.send(response)
  })
)

app.use(expressErrorHandler);

export default app
