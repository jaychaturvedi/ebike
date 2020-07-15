import express, { Application, Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";
import Sequelize from 'sequelize';
const Op = Sequelize.Op

export function createResponse(code: number, body: any, error: any) {
  let status
  if (code === 200) status = "OK"
  if (code === 500) status = "Internal Server Error"
  const errorMessage = error?.message
  const response = { status, body, error: { ...error, errorMessage }, date: new Date() }
  return response
}

export function expressErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message
  const response = createResponse(500, null, err)
  res.json(response);
  next();
}

export function expressQAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
}

export function secure(
  err: Error,
  req: Request,
  res: Response,
  next: any
) {
  console.log("Request Middleware ", req)

  // const response = createResponse(500, null, err)
  // res.json(response);
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



// export const requireLogin = (req : Request,res : Response,next : NextFunction) => {
//     var token = req.headers['authorization'];
// request({
//        url : `https://cognito
// idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
//        json : true
//     }, function(error, response, body){
//        if (!error && response.statusCode === 200) {
//            pems = {};
//            var keys = body['keys'];
//            for(var i = 0; i < keys.length; i++) {
//                 var key_id = keys[i].kid;
//                 var modulus = keys[i].n;
//                 var exponent = keys[i].e;
//                 var key_type = keys[i].kty;
//                 var jwk = { kty: key_type, n: modulus, e: exponent};
//                 var pem = jwkToPem(jwk);
//                 pems[key_id] = pem;
//            }
//            var decodedJwt = jwt.decode(token, {complete: true});
//                 if (!decodedJwt) {
//                     console.log("Not a valid JWT token");
//                     res.status(401);
//                     return res.send("Invalid token");
//                }
//             var kid = decodedJwt.header.kid;
//                 var pem = pems[kid];
//                 if (!pem) {
//                     console.log('Invalid token');
//                     res.status(401);
//                     return res.send("Invalid token");              
//                 }
//             jwt.verify(token, pem, function(err, payload) {
//                     if(err) {
//                         console.log("Invalid Token.");
//                         res.status(401);
//                         return res.send("Invalid tokern");
//                     } else {
//                          console.log("Valid Token.");
//                          return next();
//                     }
//                });
//        } else {
//              console.log("Error! Unable to download JWKs");
//              res.status(500);
//              return res.send("Error! Unable to download JWKs");
//        }
//    });
//     next()
// }

