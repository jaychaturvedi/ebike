import { Features, UserFeatures } from './service'
import express, { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const features = await Features.findAll()
        const response = createResponse("OK", features, undefined)
        res.send(response)
    })
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const feature = await Features.findById(Id)
        const response = createResponse("OK", feature, undefined)
        res.json(response)
    })
)

app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = await Features.createNew(req.body)
        const response = createResponse("OK", feature, undefined)
        res.json(response)
    })
)

app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const updated = await Features.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.params.id as any as number
        const deleted = await Features.deleteById(Id);
        const response = createResponse("OK", "feature deleted with id " + Id, undefined)
        res.json(response);
    })
)

app.get('/user',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserFeatures.findAll()
        const response = createResponse("OK", userFeatures, undefined)
        res.json(response)
    })
)

app.get('/user/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const userFeature = await UserFeatures.findById(Id)
        const response = createResponse("OK", userFeature, undefined)
        res.json(response)
    })
)

app.post('/user', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserFeatures.createNew(req.body)
        const response = createResponse("OK", userFeatures, undefined)
        res.json(response)

    })
)

app.put('/user/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = req.params.id as any as number
        const updated = await UserFeatures.updateById(Id, req.body);
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.delete('/user/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = req.params.id as any as number
        await UserFeatures.deleteById(Id);
        const response = createResponse("OK", "UserFeatures deleted with id " + Id, undefined)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
