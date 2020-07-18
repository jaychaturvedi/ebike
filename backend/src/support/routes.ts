import { SupportFeatures, UserSupportFeatures } from './service'
import express, { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const features = await SupportFeatures.findAll()
        const response = createResponse("OK", features, undefined)
        res.json(response)
    })
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const feature = await SupportFeatures.findById(Id)
        const response = createResponse("OK", feature, undefined)
        res.json(response)
    })
)

app.post('/', [
    body('name', "name is too short").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = await SupportFeatures.createNew(req.body)
        const response = createResponse("OK", feature, undefined)
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name is too short").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number;
        const updated = await SupportFeatures.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.params.id as any as number;
        await SupportFeatures.deleteById(Id);
        const response = createResponse("OK", "Feature deleted with id " + Id, undefined)
        res.json(response);
    })
)

app.get('/user',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserSupportFeatures.findAll()
        const response = createResponse("OK", userFeatures, undefined)
        res.json(response)

    })
)

app.get('/user/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const userFeatures = await UserSupportFeatures.findById(Id)
        const response = createResponse("OK", userFeatures, undefined)
        res.json(response)
    })
)

app.post('/user', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserSupportFeatures.createNew(req.body)
        const response = createResponse("OK", userFeatures, undefined)
        res.json(response)
    })
)

app.put('/user/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const updated = await UserSupportFeatures.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/user/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.params.id as any as number;
        await UserSupportFeatures.deleteById(Id);
        const response = createResponse("OK", "User deleted with id " + Id, undefined)
        res.json(response);

    })
)

app.use(expressErrorHandler);

export default app
