import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Sequelize from 'sequelize';
const Op = Sequelize.Op

export function expressErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    res.locals.message = err.message
    res.json({
        message : err.message
    });
    next();
}


export function expressQAsync(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export function validate(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errlist = errors.array().map((err) => { return err.msg })
        return res.status(422).json({ errors: errlist });
    }
    next();
}

//this could be placed in each feature file
export function pagination(pageNumber :number, pageSize :number){
    const limit = pageSize ? pageSize : 1
    const offset = pageNumber ? (pageNumber -1)* limit : 0
    return { 
        limit,
        offset
    }
}

//this could be placed in each feature file
export function filters(filter:{[k: string]: any} ){
    var where :{[k: string]: any}= {}
    Object.keys(filter).forEach(function(key) {
        where[key] = { [Op.like]: `%${filter[key]}%`};
      });

    return where
  };

