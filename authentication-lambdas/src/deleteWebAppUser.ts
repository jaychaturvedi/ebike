const AWS = require('aws-sdk');

import * as dotenv from "dotenv"
import { APIGatewayProxyEvent, Context } from "aws-lambda";
dotenv.config()
const globalAny: any = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null

const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;

const userPoolRegion = 'us-east-2'
const userPoolID = 'us-east-2_4yqT9fdQs'
const userPoolWebClientID = '3t0apcbmln1ns8gp970j0lqjvg'

const accessKeyId = process.env.ACCESSKEYID
const secretAccessKey = process.env.SECRETKEY
const region = "us-east-2"

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
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");
    return new Promise((resolve, reject) => {
        client.adminDeleteUser(params).promise()
            .then((user: any) => {
                console.warn(".. delete_cognito: complete");
                resolve("user deleted successfullyy");
            })
            .catch((err: any) => {
                console.error(".. delete_cognito: error");
                console.error(err);
                reject(err);
            });
    })
}
// var paramsy = {
//     UserPoolId: 'us-east-2_4yqT9fdQs',
//     Username: 'jaychaturvedi18@gmail.com',
// }
// deleteUser(paramsy)
//     .then((userDetails: any) => {
//         console.log(userDetails)
//     })
//     .catch(err => console.log(err.code, err.message, err.statusCode));


// will be pushed other file
// lambda function to be triggered to create new user
module.exports.deleteWebAppUser = async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body!)
    const userEmail = body.userEmail
    var params = {
        UserPoolId: userPoolID,
        Username: userEmail
    };
    let responseBody: any
    let errorBody: any
    try {
        responseBody = await deleteUser(params)
        console.log(responseBody)
    }
    catch (e) {
        console.log(e)
        errorBody = e
    }
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "user_creation"
        },
        body: JSON.stringify({ response: responseBody, err: errorBody }),
        isBase64Encoded: false
    };
    return response
};