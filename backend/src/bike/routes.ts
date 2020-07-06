import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate } from '../helper'
import DbBike from "./service"

const app = express.Router()

// //get All records
app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bikes = await DbBike.findAll()
    const response = { status: "OK", body: bikes, error: null, date: new Date() }
    res.json(response)
})
)
// // find single record
app.get('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const bike = await DbBike.findById(Id)
        const response = { status: "OK", body: bike, error: null, date: new Date() }
        res.json(response)
    })

// create 
app.post('/', [
    body('userId', "some message").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const bike = await DbBike.createNew(req.body)
        const response = { status: "OK", body: bike, error: null, date: new Date() }
        res.json(response)

    })
)
//update
app.put('/:id', [
    body('name', "some message").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const updated = await DbBike.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)
    })
)

//delete
app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id)
    const deleted = await DbBike.deleteById(Id);
    res.json("User deleted with id " + Id);

})
)



app.use(expressErrorHandler);

export default app
