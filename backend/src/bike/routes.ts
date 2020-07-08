import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
import Bike from "./service"

const app = express.Router()

// //get All records
app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const bikes = await Bike.findAll()
        const response = createResponse(200, bikes, null)
        res.json(response)
    })
)
// // find single record
app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const bike = await Bike.findById(Id)
        const response = createResponse(200, bike, null)
        res.json(response)
    })
)

// create 
app.post('/', [
    body('userId', "some message").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const bike = await Bike.createNew(req.body)
        const response = createResponse(200, bike, null)
        res.json(response)

    })
)
//update
app.put('/:id', [
    body('name', "some message").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const updated = await Bike.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

//delete
app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {

        const Id = Number(req.params.id)
        const deleted = await Bike.deleteById(Id);
        const response = createResponse(200,"User deleted with id " + Id, null)
        res.json(response);
    })
)


app.use(expressErrorHandler);

export default app
