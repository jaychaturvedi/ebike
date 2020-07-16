import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import User, { TFilter } from "./service"
import localstore from "store";
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
const app = express.Router()


app.get('/all', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.findAll()
        const response = createResponse("OK", users, undefined)
        res.json(response)
    })
)

app.get('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findByUid(localstore.get('user').uid)
        const response = createResponse("OK", user, undefined)
        res.json(response)
    })
)

app.get('/logout', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        localstore.remove('user')
        const response = createResponse("OK", "logged out", undefined)
        res.json(response)
    })
)

app.put('/', expressQAsync(secure),
    [query('fullName', "name is too short").isString().isLength({ min: 3 }),
    query("email", "Email is invalid").isEmail(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const uid = localstore.get('user').uid
        const { fullName, email } = req.query as any
        const updated = await User.updateByUid(uid, { fullName, email });
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)
app.post('/', expressQAsync(secure),
    [body('name', "name is too short").optional().isString().isLength({ min: 3 }),
    body("email", "Email is invalid").optional().isEmail(),
    body("frameId").optional().isString(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { phone, uid } = localstore.get('user')
        const preuser = await User.findByUid(localstore.get('user').uid)
        if (preuser) res.json(createResponse("OK", preuser, undefined))
        const user = {
            phone,
            frameId: req.body.frameId as string,
            uid,
            email: req.body.email as string
        }
        const newUser = await User.createNew(user)
        const response = createResponse("OK", newUser, undefined)
        res.json(response)
    })
)

app.delete('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response) => {
        const uid = localstore.get('user').uid
        const deleted = await User.deleteById(uid);
        const response = createResponse("OK", "User deleted with id " + req.params.uid, undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app



