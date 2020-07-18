import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Sequelize from 'sequelize';
import localstore from "store";
import JwtDecode from "jwt-decode";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError, MotoVoltError, UserError, FeedbackError, IssuesError, FeaturesError, RideError, SupportError, AlertError } from "./error";
const Op = Sequelize.Op

type TResponseStatus = "OK" | "NOT_FOUND" | "INVALID_REQUEST" | "UNKNOWN_ERROR"
  | "BAD_REQUEST_EROR" | "FORBIDDEN_ERROR" | "NOT_FOUND_ERROR" | "UNAUTHORIZED_ERROR"

export function createResponse(status: TResponseStatus, body: any,
  error: { code: number, message: string, name: string } | undefined) {
  return {
    status: status,
    body: body,
    error: error !== undefined ? {
      code: error.code,
      name: error.name,
      message: error.message,
    } : null,
    date: new Date()
  }
}

export function expressErrorHandler(err: Error, req: Request, res: Response,
  next: NextFunction) {

  let status: TResponseStatus = 'OK'; let statusCode: number = 200;

  if (err instanceof BadRequestError || err instanceof ForbiddenError ||
    err instanceof NotFoundError || err instanceof UnauthorizedError) {
    status = err.name as TResponseStatus || "UNKNOWN_ERROR";
    statusCode = err.errorCode
  }
  else if (err instanceof UserError || err instanceof RideError ||
    err instanceof FeedbackError || err instanceof IssuesError ||
    err instanceof FeaturesError || err instanceof FeaturesError ||
    err instanceof SupportError || err instanceof AlertError) {
    status = "OK"
    statusCode = 200
  }
  console.log(err.name);

  const response = createResponse(status, null, {
    code: (err as MotoVoltError).errorCode,
    name: err.name,
    message: err.message
  })
  res.status(statusCode)
  res.json(response);
  next();
}

export function expressQAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
}

export function secure(
  req: Request,
  res: Response,
  next: any
) {
  const token = req.headers.authorization as string
  if (!token) return res.status(401).send("pass json token in headers")
  const { sub: uid, phone_number: phone } = JwtDecode(token)
  if (!uid) return res.status(401).send("invalid token")
  res.locals.user = { uid, phone }
  next()
}

export function pagination(pageNumber: number, pageSize: number) {
  const limit = pageSize ? pageSize : 1
  const offset = pageNumber ? (pageNumber - 1) * limit : 0
  return {
    limit,
    offset
  }
}

export function filters(filter: { [k: string]: any }) {
  var where: { [k: string]: any } = {}
  Object.keys(filter).forEach(function (key) {
    where[key] = { [Op.eq]: `%${filter[key]}%` };
  });
  return where
};

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errlist = errors.array().map((err) => { return err.msg })
    return res.status(422).json({ errors: errlist });
  }
  next();
}

