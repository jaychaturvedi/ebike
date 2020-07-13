import { SupportFeatures, UserSupportFeatures } from './service'
import express, { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()

app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const features = await SupportFeatures.findAll()
        const response = createResponse(200, features, null)
        res.json(response)
    })
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const feature = await SupportFeatures.findById(Id)
        const response = createResponse(200, feature, null)
        res.json(response)
    })
)

app.post('/', [
    body('name', "name is too short").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = await SupportFeatures.createNew(req.body)
        const response = createResponse(200, feature, null)
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name is too short").isLength({ min: 3 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await SupportFeatures.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = Number(req.params.id);
        await SupportFeatures.deleteById(Id);
        const response = createResponse(200, "Feature deleted with id " + Id, null)
        res.json(response);
    })
)

app.get('/user',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserSupportFeatures.findAll()
        const response = createResponse(200, userFeatures, null)
        res.json(response)

    })
)

app.get('/user/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const userFeatures = await UserSupportFeatures.findById(Id)
        const response = createResponse(200, userFeatures, null)
        res.json(response)
    })
)

app.post('/user', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await UserSupportFeatures.createNew(req.body)
        const response = createResponse(200, userFeatures, null)
        res.json(response)
    })
)

app.put('/user/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const updated = await UserSupportFeatures.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

app.delete('/user/:id',
    expressQAsync(async (req: Request, res: Response) => {
        const Id = Number(req.params.id);
        await UserSupportFeatures.deleteById(Id);
        const response = createResponse(200, "User deleted with id " + Id, null)
        res.json(response);

    })
)

app.use(expressErrorHandler);

export default app
