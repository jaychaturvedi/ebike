const AWS = require('aws-sdk');
import rp from 'request-promise';
import * as dotenv from "dotenv"
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import User, { TFilter } from "./service";

const globalAny: any = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null
const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;
const userPoolRegion = process.env.REGION
const userPoolID = process.env.USERPOOLID;//zelp_app_authentication
const userPoolWebClientID = process.env.MOBILEUSERPOOLWEBCLIENTID;
dotenv.config()
const accessKeyId = process.env.ACCESSKEYID
const secretAccessKey = process.env.SECRETKEY
const region = process.env.REGION

// configure Amplify
Amplify.configure({
  Auth: {
    region: userPoolRegion,
    userPoolId: userPoolID,
    userPoolWebClientId: userPoolWebClientID,
  },
});
//AWS config
AWS.config.update({ accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region });
var CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;
var client = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-19' });

function deleteUser(params: any) {
  let options = {
    method: 'DELETE',
    uri: process.env.MOBILEAPIURL + params.Username,
    json: true
  };
  if (!Auth.configure())
    return Promise.reject("could not configure amplify");
  return new Promise((resolve, reject) => {
    //delete from cognito pool
    client.adminDeleteUser(params).promise()
      .then(() => {
        console.warn(".. delete_cognito: complete");
        //now delete from sql db by hitting user endpoint
        return rp(options)
      })
      .then((response: any) => {
        console.log("DELETE succeeded with status ", response);
        //response type is {status,body,error,data}
        resolve(response.body)
      })
      .catch((err: any) => {
        console.error(".. delete_cognito: error");
        console.error(err.code, err.message, err.statusCode);
        reject({ code: err.code, message: err.message, statusCode: err.statusCode });
      });
  })
}

// lambda function to be triggered to create new user
export const deleteAppCognitoAndDbUser = async (phone: string) => {
  var params = {
    UserPoolId: userPoolID,
    Username: phone
  };
  let responseBody: any
  let deletedDbUser: any
  let errorBody: any
  const deletedRecord = await User.deleteByPhone(phone)
  try {
    responseBody = await deleteUser(params)
    console.log(responseBody, deletedRecord)
  }
  catch (e) {
    deletedDbUser = await rp({
      method: 'DELETE',
      uri: process.env.MOBILEAPIURL + params.Username,
      json: true
    })
    console.log(deletedDbUser);
    errorBody = e
  }
  const response = { response: responseBody, err: errorBody }
  return response
};