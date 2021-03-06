import express, { Request, Response, NextFunction } from "express";
import { body, param, query } from "express-validator";
import User, { TFilter } from "./service"
import { expressQAsync, expressErrorHandler, validate, createResponse, secure } from '../helper'
import { UserError } from "../error";
import { deleteAppCognitoAndDbUser } from "./lamdaService";
import { profile } from "./controller";
const app = express.Router()


app.get('/all',
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date())
    const users = await User.findAll()
    const response = createResponse("OK", users, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

app.get('/', expressQAsync(secure),
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date())
    const user = await profile(res.locals.user.uid)
    const response = createResponse("OK", user, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)
//updates name and email during registration
app.put('/', expressQAsync(secure),
  [body('fullName', "fullName is required").isString().isLength({ min: 1 }),
  body("email", "email is required").isEmail(),
  body('age', "age is required").isString().isLength({ min: 1 }),
  body('gender', "gender is required").isString().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date(), "request body", req.body)
    const uid = res.locals.user.uid
    const { fullName, email, age, gender } = req.body
    // if (!fullName && !email && !age && !gender) //optional condition
    //     throw new UserError("Please pass atleast one of 'fullName', 'email','age', or 'gender' ");
    const updated = await User.updateByUid(uid, { fullName, email, age, gender });
    console.log('====================================');
    console.log("updated user personal details", updated);
    console.log('====================================');
    const response = createResponse("OK", updated, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

//post routes just for testing purpose, in prod user created by cognito
app.post('/',
  [body('uid', "uid is too short").isString(),
  body("phone", "phone is invalid").isString(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date(), "request body", req.body)
    const { phone, uid } = req.body as any
    const newUser = await User.createNew({ phone, uid })
    console.log('====================================');
    console.log("created new user", newUser);
    console.log('====================================');
    const response = createResponse("OK", newUser, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)
// app.post('/', expressQAsync(secure),
//     expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const { phone, uid } = res.locals.user as any
//         const newUser = await create(req.body)
//         const response = createResponse("OK", newUser, undefined)
//         res.json(newUser)
//     })
// )

app.post('/create', expressQAsync(secure),
  [body('uid', "uid is too short").isString(),
  body("phone", "phone is invalid").isString(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date(), "request body", req.body)
    const { phone, uid } = res.locals.user
    const newUser = await User.createNew({ phone, uid })
    const response = createResponse("OK", newUser, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)
//for testing purpose only, need to be deleted
app.put('/update/:phone',
  [param('phone', "phone is required in params").isString(),
  body('frameId', "frameId is required in body").isString(), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date(), "request body", req.body, req.params)
    const { frameId } = req.body
    //update frameId found from ValidatePhone API
    const updated = await User.updateByPhone(req.params.phone, { frameId });
    console.log('====================================');
    console.log("updated user", updated);
    console.log('====================================');
    const response = createResponse("OK", updated, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

app.delete('/phone/:phone',
  [param('phone', "phone can't be empty").isString().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response) => {
    const { phone } = req.params
    console.log("Start Time:", new Date(), "request for delete user", req.params)
    const deleted = await User.deleteByPhone(phone);
    const response = createResponse("OK", "User deleted with phone " + phone, undefined)
    console.log("End Time:", new Date())
    res.json(response);
  })
)

app.delete('/cognito/:phone',
  [param('phone', "phone can't be empty").isString().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deletedDbAndCognitoUser = await deleteAppCognitoAndDbUser(req.params.phone as string)
    const response = createResponse("OK", deletedDbAndCognitoUser.response, deletedDbAndCognitoUser.err)
    console.log(response);
    res.json(response)
  })
)

app.delete('/:uid',
  [param('uid', "uid is required in params").isString().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Start Time:", new Date(), "request for delete user", req.params)
    const uid = req.params.uid as string
    const deleted = await User.deleteById(uid);
    const response = createResponse("OK", "User deleted with id " + uid, undefined)
    console.log("End Time:", new Date())
    res.json(response)
  })
)

app.use(expressErrorHandler);

export default app

