import { DbFeatures, DbUserFeatures } from './service'
import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import { expressQAsync, expressErrorHandler, validate } from '../helper'
const app = express.Router()



// //get All records
app.get('/', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const features = await DbFeatures.findAll()
    const response = { status: "OK", body: features, error: null, date: new Date() }
    res.status(200).send(response)

})
)

app.get('/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id)
        const feature = await DbFeatures.findById(Id)
        const response = { status: "OK", body: feature, error: null, date: new Date() }
        res.json(response)
    })
)
app.post('/', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const feature = await DbFeatures.createNew(req.body)
        const response = { status: "OK", body: feature, error: null, date: new Date() }
        res.json(response)

    })
)

app.put('/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const Id = Number(req.params.id);
        const updated = await DbFeatures.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)

    })
)


app.delete('/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    const deleted = await DbFeatures.deleteById(Id);
    return res.json("feature deleted with id " + Id);
})
)




app.get('/user', expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userFeatures = await DbUserFeatures.findAll()
    const response = { status: "OK", body: userFeatures, error: null, date: new Date() }
    res.json(response)

})
)
// // find single record
app.get('/user/:id',
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id)
        const feature = await DbUserFeatures.findById(Id)
        const response = { status: "OK", body: feature, error: null, date: new Date() }
        res.json(response)
    })
)
// create 
app.post('/user', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {
        const userFeatures = await DbUserFeatures.createNew(req.body)
        const response = { status: "OK", body: userFeatures, error: null, date: new Date() }
        res.json(response)

    })
)
//update
app.put('/user/:id', [
    body('name', "name can't be empty").isLength({ min: 1 }),
    validate],
    expressQAsync(async (req: Request, res: Response, next: NextFunction) => {

        const Id = Number(req.params.id);
        const updated = await DbUserFeatures.updateById(Id, req.body);
        const response = { status: "OK", body: updated, error: null, date: new Date() }
        res.json(response)
    })
)

//delete
app.delete('/user/:id', expressQAsync(async (req: Request, res: Response) => {

    const Id = Number(req.params.id);
    await DbUserFeatures.deleteById(Id);
    res.json("User deleted with id " + Id);
})
)

app.use(expressErrorHandler);

export default app
