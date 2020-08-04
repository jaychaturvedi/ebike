import * as Express from "express";
import { validationResult, body } from "express-validator";

const app = Express.Router();

function validate(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error((errors.array({ onlyFirstError: true })[0] as any).msg);
    }
    next();
}

export function expressQAsync(fn: Function) {
    return (req: Express.Request, res: Express.Response, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

function secure(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    // Authenticate requests
    console.log("webapp req secure", req);
    next();
}

app.get("/test",
    secure,
    [validate],
    expressQAsync(async (
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
    ) => {
        console.log("hi")
        res.json("Hello world!");
    })
)

function expressErrorHandler(
    err: Error,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    res.status(500);
    res.json({
        status: "Error",
    });
    next();
}

// app.put('/', expressQAsync(secure),
//     [body('fullName', "name is too short").isString().isLength({ min: 3 }),
//     body("email", "Email is invalid").isEmail(), validate],
//     expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
//         const uid = res.locals.user.uid
//         const { fullName, email } = req.body
//         const updated = await User.updateByUid(uid, { fullName, email });
//         const response = createResponse("OK", updated, undefined)
//         res.json(response)
//     })
// )






app.use(expressErrorHandler);


export default app;