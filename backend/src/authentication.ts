// // import { } from 'request-promise'
// import axios from "axios";
// import JwtDecode from "jwt-decode";
// import jwt from "jsonwebtoken"
// import jwkToPem from 'jwk-to-pem'
// // token: string, callback: Function
// // const token = "eyJraWQiOiJYT0R0ZUFJa2JFUSswU1pCSkkzNDhjdVBuakwwSzJlYUFJeUl5TXJoUHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjM2VmZTkwNS1kNmNkLTQ2MWUtYjYzMy01OTcxNmIyMGMzMDAiLCJhdWQiOiIyMDFydnA5Y2dhMXYwZm9pbTJhYWI2ZzNvZiIsImV2ZW50X2lkIjoiNGMyYTc3MzItMmVjYi00YjQxLTg4ODEtZmM0NjVmYzJkYzY3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3MDMzNTUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzNFcmRZOGhIMCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImMzZWZlOTA1LWQ2Y2QtNDYxZS1iNjMzLTU5NzE2YjIwYzMwMCIsInBob25lX251bWJlciI6Iis5MTg4ODA1OTE1MTQiLCJleHAiOjE1OTc3MDY5NTUsImlhdCI6MTU5NzcwMzM1NX0.PdN9MysbMtwwrvNZkX7eL6y3m9KZCddQ8JKr1MxnieiL6E5xML22PBskZDT7QMTWjf16byZAHzcAGaTNwl4d7j2emv7fRlFkqhNgzO8YUWe66opjxCoCqlgFv9KRLpgxIdl7xeQR3fSKEwMHQsDIcBFaW6KdO6VmljSiJkx51ppNzl3NuEW_U2vXLCipJslO7-EuYrhu_cSl8cSb2eMk4gQhrCr8RYU0OmjcBNhZcwfhmsNr38iT1zUXSBnN8tFduKMCUIau7Oc2cxffqw0hY4h7SJ7RrQrGZQuonmS1HRTrrWi8cShCEHpsg8WiFFWiIdQwKjc69zy1XvqtCbqHEw"
// const token = "eyJraWQiOiJYT0R0ZUFJa2JFUSswU1pCSkkzNDhjdVBuakwwSzJlYUFJeUl5TXJoUHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjM2VmZTkwNS1kNmNkLTQ2MWUtYjYzMy01OTcxNmIyMGMzMDAiLCJhdWQiOiIyMDFydnA5Y2dhMXYwZm9pbTJhYWI2ZzNvZiIsImV2ZW50X2lkIjoiNGMyYTc3MzItMmVjYi00YjQxLTg4ODEtZmM0NjVmYzJkYzY3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTc3MDMzNTUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzNFcmRZOGhIMCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImMzZWZlOTA1LWQ2Y2QtNDYxZS1iNjMzLTU5NzE2YjIwYzMwMCIsInBob25lX251bWJlciI6Iis5MTg4ODA1OTE1MTQiLCJleHAiOjE1OTc3MDY5NTUsImlhdCI6MTU5NzcwMzM1NX0.PdN9MysbMtwwrvNZkX7eL6y3m9KZCddQ8JKr1MxnieiL6E5xML22PBskZDT7QMTWjf16byZAHzcAGaTNwl4d7j2emv7fRlFkqhNgzO8YUWe66opjxCoCqlgFv9KRLpgxIdl7xeQR3fSKEwMHQsDIcBFaW6KdO6VmljSiJkx51ppNzl3NuEW_U2vXLCipJslO7-.-EuYrhu_cSl8cSb2eMk4gQhrCr8RYU0OmjcBNhZcwfhmsNr38iT1zUXSBnN8tFduKMCUIau7Oc2cxffqw0hY4h7SJ7RrQrGZQuonmS1HRTrrWi8cShCEHpsg8WiFFWiIdQwKjc69zy1XvqtCbqHEw"
// const poolData = {
//     UserPoolId: "us-east-2_3ErdY8hH0",
//     ClientId: "us-east-2"
// };

// const middleware = (token: string) => {

//     axios.get(`https://cognito-idp.us-east-2.amazonaws.com/us-east-2_3ErdY8hH0/.well-known/jwks.json`,
//         { responseType: "json" }
//     ).then((res) => {
//         console.log("data:", res.data);
//         const body = res.data
//         let pems: any = {};
//         var keys = body['keys'];
//         for (var i = 0; i < keys.length; i++) {
//             var key_id = keys[i].kid;
//             var modulus = keys[i].n;
//             var exponent = keys[i].e;
//             var key_type = keys[i].kty;
//             var jwk = { kty: key_type, n: modulus, e: exponent };
//             var pem = jwkToPem(jwk);
//             pems[key_id] = pem;
//         }

//         var decodedJwt = jwt.decode(token, { complete: true }) as any;
//         console.log("json decoded:", decodedJwt);
//         if (!decodedJwt) {
//             console.log("Not a valid JWT token");
//             return -1
//         }
//         var kid = decodedJwt.header.kid;
//         pem = pems[kid];
//         console.log("pemm", pem);

//         if (!pem) {
//             console.log('Invalid token');
//         }
//         jwt.verify(token, pem, function (err, payload) {
//             if (err) {
//                 console.log("Invalid Token.");
//                 return -1
//             } else {
//                 console.log("Valid Token.");
//                 return 1
//             }
//         });
//     }).catch((e) => {
//         console.log(e);
//     })
// }

// export default middleware


// //     request({
// //         url : `https://cognito
// //  idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
// //         json : true
// //      }, function(error, response, body){
// //         if (!error && response.statusCode === 200) {
// //             pems = {};
// //             var keys = body['keys'];
// //             for(var i = 0; i < keys.length; i++) {
// //                  var key_id = keys[i].kid;
// //                  var modulus = keys[i].n;
// //                  var exponent = keys[i].e;
// //                  var key_type = keys[i].kty;
// //                  var jwk = { kty: key_type, n: modulus, e: exponent};
// //                  var pem = jwkToPem(jwk);
// //                  pems[key_id] = pem;
// //             }
// //          var decodedJwt = jwt.decode(token, {complete: true});
// //                  if (!decodedJwt) {
// //                      console.log("Not a valid JWT token");
// //                      callback(new Error('Not a valid JWT token'));
// //                  }
// //                  var kid = decodedJwt.header.kid;
// //                  var pem = pems[kid];
// //                  if (!pem) {
// //                      console.log('Invalid token');
// //                      callback(new Error('Invalid token'));
// //                  }
// //                 jwt.verify(token, pem, function(err, payload) {
// //                      if(err) {
// //                          console.log("Invalid Token.");
// //                          callback(new Error('Invalid token'));
// //                      } else {
// //                           console.log("Valid Token.");
// //                           callback(null, "Valid token");
// //                      }
// //                 });
// //         } else {
// //               console.log("Error! Unable to download JWKs");
// //               callback(error);
// //         }
// //     });
// //  }