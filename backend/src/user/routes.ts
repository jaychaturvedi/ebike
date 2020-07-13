import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import User, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.findAll()
        const response = createResponse(200, users, null)
        res.json(response)
    })
)

app.get('/',
    [query('phone', "phone is too short").isLength({ min: 3 }).optional(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const phone = req.query.phone as string
        const user = await User.findByPhone(phone)
        const response = createResponse(200, user, null)
        res.json(response)
    })
)

app.post('/',
    [body('name', "name is too short").isLength({ min: 3 }).optional(),
    body("email", "Email is invalid").isEmail().optional(),
    body('phoneNumber', "Phone is too short").isLength({ min: 10, max: 15 }).isString(),
    body("uid", "uid is invalid").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { phoneNumber, uid } = req.body
        const user = {
            phone: req.body.phoneNumber as string,
            frameId: req.body.frameId as string,
            uid: req.body.uid as string,
            email: req.body.email as string
        }
        const newUser = await User.createNew(user)
        const response = createResponse(200, newUser, null)
        res.json(response)
    })
)

app.put('/:phone',
    [param("phone", "enter correct phone number").isLength({ min: 1 }),
    body('fullName', "name is too short").isLength({ min: 3 }),
    body("email", "Email is invalid").isEmail(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updated = await User.updateByPhone(req.params.phone, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

app.delete('/:uid',
    [param("uid", "uid is invalid").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response) => {
        const deleted = await User.deleteById(req.params.uid);
        const response = createResponse(200, "User deleted with id " + req.params.uid, null)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app



