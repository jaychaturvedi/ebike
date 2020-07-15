import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import User, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.findAll()
        const response = createResponse("OK", users, undefined)
        res.json(response)
    })
)

app.get('/',
    [query('phone', "phone is too short").optional().isLength({ min: 3 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const phone = req.query.phone as string
        const user = await User.findByPhone(phone)
        const response = createResponse("OK", user, undefined)
        res.json(response)
    })
)

app.post('/',
    [body('name', "name is too short").optional().isString().isLength({ min: 3 }),
    body("email", "Email is invalid").optional().isEmail(),
    body("frameId").optional().isString(),
    body('phoneNumber', "Phone is too short").isString().isLength({ min: 10, max: 15 }),
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
        const response = createResponse("OK", newUser, undefined)
        res.json(response)
    })
)

app.put('/:phone',
    [param("phone", "enter correct phone number").isString().isLength({ min: 1 }),
    body('fullName', "name is too short").isString().isLength({ min: 3 }),
    body("email", "Email is invalid").isEmail(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updated = await User.updateByPhone(req.params.phone, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/:uid',
    [param("uid", "uid is invalid").isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response) => {
        const deleted = await User.deleteById(req.params.uid);
        const response = createResponse("OK", "User deleted with id " + req.params.uid, undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app



