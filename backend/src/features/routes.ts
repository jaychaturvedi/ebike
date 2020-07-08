import { Features,  UserFeatures } from './service'
import express, { Request, Response, NextFunction } from "express";
import {  body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate, createResponse } from '../helper'
const app = express.Router()


// //get All records
app.get('/',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const features = await Features.findAll()
        const response = createResponse(200, features, null)
        res.send(response)
    })
)


app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const feature = await Features.findById(Id)
        const response = createResponse(200, feature, null)
        res.json(response)
    })
)


app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const feature = await Features.createNew(req.body)
        const response = createResponse(200, feature, null)
        res.json(response)
    })
)


app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id);
        const updated = await Features.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)


app.delete('/:id',
    expressQAsync(async (req: Request, res: Response) => {

        const Id = Number(req.params.id);
        const deleted = await Features.deleteById(Id);
        const response = createResponse(200 ,"feature deleted with id " + Id, null)
        res.json(response);
    })
)




app.get('/user',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const userFeatures = await UserFeatures.findAll()
        const response = createResponse(200, userFeatures, null)
        res.json(response)
    })
)
// // find single record
app.get('/user/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const userFeature = await UserFeatures.findById(Id)
        const response = createResponse(200, userFeature, null)
        res.json(response)
    })
)
// create 
app.post('/user', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const userFeatures = await UserFeatures.createNew(req.body)
        const response = createResponse(200, userFeatures, null)
        res.json(response)

    })
)
//update
app.put('/user/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id);
        const updated = await UserFeatures.updateById(Id, req.body);
        const response = createResponse(200, updated, null)
        res.json(response)
    })
)

//delete
app.delete('/user/:id',
    expressQAsync(async (req: Request, res: Response) => {

        const Id = Number(req.params.id);
        await UserFeatures.deleteById(Id);
        const response = createResponse(200,"UserFeatures deleted with id " + Id, null)
        res.json(response);
    })
)

app.use(expressErrorHandler);

export default app
