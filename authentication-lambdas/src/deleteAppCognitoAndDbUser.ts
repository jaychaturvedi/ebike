const AWS = require('aws-sdk');
import * as rp from 'request-promise'
import * as dotenv from "dotenv"
import { APIGatewayProxyEvent, Context } from "aws-lambda";
const globalAny: any = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null
const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;
const userPoolRegion = 'us-east-2'
const userPoolID = 'us-east-2_3ErdY8hH0';//zelp_app_authentication
const userPoolWebClientID = '201rvp9cga1v0foim2aab6g3of';
dotenv.config()
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
    let options = {
        method: 'DELETE',
        uri: process.env.MOBILEAPIURL + params.Username,
        resolveWithFullResponse: true
    };
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");
    return new Promise((resolve, reject) => {

        //delete from cognito pool
        client.adminDeleteUser(params).promise()
            .then(() => {
                console.warn(".. delete_cognito: complete");
                return rp(options)
            })
            .then((response: any) => {
                console.log("DELETE succeeded with status ", response);
                const { status, body, error, date } = JSON.parse(response.body)
                resolve({
                    status, body,
                    error, date
                })
            })
            .catch((err: any) => {
                console.error(".. delete_cognito: error");
                console.error(err.code, err.message, err.statusCode);
                reject({ code: err.code, message: err.message, statusCode: err.statusCode });
            });
    })
}

// will be pushed other file
// lambda function to be triggered to create new user
module.exports.deleteAppCognitoAndDbUser = async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body!)
    const phone = body.phone
    var params = {
        UserPoolId: userPoolID,
        Username: phone
    };
    let responseBody: any
    let deletedDbUser: any
    let errorBody: any
    try {
        responseBody = await deleteUser(params)
        // deletedDbUser = await 
        console.log(responseBody)
    }
    catch (e) {
        deletedDbUser = await rp({
            method: 'DELETE',
            uri: process.env.MOBILEAPIURL + params.Username,
            resolveWithFullResponse: true
        })
        console.log(deletedDbUser);
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