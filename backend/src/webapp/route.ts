import * as Express from "express";
import { validationResult } from "express-validator";

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
    console.log("webapp req secure",req);
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


app.use(expressErrorHandler);


export default app;