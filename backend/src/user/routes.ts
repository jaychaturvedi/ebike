import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import { TUser } from "./model"
import User, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'

const app = express.Router()

// find single record
app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const user = await User.findById(Id)
        const response = createResponse(200, user, null)
        res.json(response)
    })
)

// create 
app.post('/', [
    body('name', "name is too short").isLength({ min: 3 }),
    body("email", "Email is invalid").isEmail(),
    body('phone', "Phone is too short").isLength({ min: 10, max: 15 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const user = await User.createNew(req.body)
        const response = createResponse(200, user, null)
        res.json(response)
    })
)

//update
app.put('/:id', [
    body('name', "name is too short").isLength({ min: 3 }),
    body("email", "Email is invalid").isEmail(),
    body('phone', "Phone is too short").isLength({ min: 10, max: 15 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id);
        const updated = await User.updateById(Id, req.body);
        const response = createResponse(200,updated, null)
        res.json(response)
    })
)

//delete
app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {

        const Id = Number(req.params.id);
        const deleted = await User.deleteById(Id);
        const response = createResponse(200, "User deleted with id " + Id, null)
        return res.json(response);
    })
)


//get filtered records
app.get('/', [
    query('id').toInt().optional(),
    query('name').isString().withMessage("something").optional(),
    query('email').isString().withMessage("something").optional(),
    query('phone').isString().withMessage("something").optional(),
    query('pageSize').toInt().optional(),
    query('pageNumber').toInt().optional(),
    validate], expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const { pageSize, pageNumber, name, phone, email, id } = req.query
        const users = await User.findAll({
            id: (id as any) as number,
            name: name as string,
            phone: phone as string,
            email: email as string,
            pageNumber: (pageNumber as any) as number,
            pageSize: (pageSize as any) as number
        })
        const response = createResponse(200,users, null)
        res.json(response)
    })
)


app.use(expressErrorHandler);

export default app
