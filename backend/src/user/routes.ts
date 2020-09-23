import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import User, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { profile } from "./controller";
const app = express.Router()


app.get('/all',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.findAll()
        const response = createResponse("OK", users, undefined)
        res.json(response)
    })
)

app.get('/', expressQAsync(secure),
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await profile(res.locals.user.uid)
        const response = createResponse("OK", user, undefined)
        res.json(response)
    })
)
//updates name and email during registration
app.put('/', expressQAsync(secure),
    [body('fullName', "fullName is too short").isString().isLength({ min: 3 }),
    body("email", "email is invalid").isEmail(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const uid = res.locals.user.uid
        const { fullName, email } = req.body
        const updated = await User.updateByUid(uid, { fullName, email });
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

//post routes just for testing purpose, in prod user created by cognito
app.post('/',
    [body('uid', "uid is too short").isString(),
    body("phone", "phone is invalid").isString(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { phone, uid } = req.body as any
        const newUser = await User.createNew({ phone, uid })
        const response = createResponse("OK", newUser, undefined)
        res.json(response)
    })
)
//for testing purpose only, need to be deleted
app.put('/update/:phone',
    [param('phone', "phone is required in params").isString(),
    body('frameId', "frameId is required in body").isString(), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { frameId } = req.body
        //update frameId found from ValidatePhone API
        const updated = await User.updateByPhone(req.params.phone, { frameId });
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/phone/:phone',
    [param('phone', "phone can't be empty").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response) => {
        const { phone } = req.params
        const deleted = await User.deleteByPhone(phone);
        const response = createResponse("OK", "User deleted with phone " + phone, undefined)
        res.json(response);
    })
)

app.delete('/:uid',
    [param('uid', "uid is required in params").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const uid = req.params.uid as string
        const deleted = await User.deleteById(uid);
        const response = createResponse("OK", "User deleted with id " + uid, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);

export default app

