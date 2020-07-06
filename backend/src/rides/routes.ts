import express, { Application, Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import DbRide from './service'
import {expressErrorHandler,expressQAsync, validate} from '../helper'
const app = express.Router()



// //get All records
app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const rides = await DbRide.findAll()
    const response = { status: "OK", body: rides, error: null, date: new Date() }
    res.status(200).send(response)

})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const ride = await DbRide.findById(Id)
        const response = { status: "OK", body: ride, error: null, date: new Date() }
        res.json(response)
    })
)
app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const newride = await DbRide.createNew(req.body)
        const response = { status: "OK", body: newride, error: null, date: new Date() }
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await DbRide.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)

    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    const deleted = await DbRide.deleteById(Id);
    return res.json("feature deleted with id " + Id);
})
)


app.use(expressErrorHandler)
export default app
