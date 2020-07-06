import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param, query } from "express-validator";
import Sequelize from 'sequelize';
import { TUser } from "./model"
import DbUser, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate } from '../helper'

const app = express.Router()

// find single record
app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const user = await DbUser.findById(Id)
        const response = { status: "OK", body: user, error: null, date: new Date() }
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

        const user = await DbUser.createNew(req.body)
        const response = { status: "OK", body: user, error: null, date: new Date() }
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
        const updated = await DbUser.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)
    })
)

//delete
app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {
    const Id = Number(req.params.id);
    await DbUser.deleteById(Id);
    return res.json("User deleted with id " + Id);
})
)


//get filtered records
app.get('/', [
    query('id').toInt(),
    query('name').isString().withMessage("something").optional(),
    query('email').isString().withMessage("something").optional(),
    query('phone').isString().withMessage("something").optional(),
    query('pageSize').toInt(),
    query('pageNumber').toInt(),
    validate], expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { pageSize, pageNumber, name, phone, email, id } = req.query
        const users = await DbUser.findAll({
            id: (id as any) as number,
            name: name as string,
            phone: phone as string,
            email: email as string,
            pageNumber: (pageNumber as any ) as number,
            pageSize: (pageSize as any ) as number
        })
        const response = { status: "OK", body: users, error: null, date: new Date() }
        res.json(response)
    })
)


app.use(expressErrorHandler);

export default app
