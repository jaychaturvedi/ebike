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
const userPoolID = 'us-east-2_4yqT9fdQs'//zelp_web_authentication
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

function createUser(params: any, userEmail: string, password: string) {
    let this_account: any = undefined;
    let this_account_details: any = undefined
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");

    return new Promise((resolve, reject) => {
        client.adminCreateUser(params)
            .promise()
            .then((user: any) => {
                console.log("created User", user)
                return Auth.signIn(user.User.Username, password);
            })
            .then((user: any) => {
                return Auth.completeNewPassword(user, password, {
                    email: userEmail
                });
            })
            .then((user: any) => {
                console.warn(".. create_cognito: confirmed..");
                this_account = user;
                // get details
                return Auth.currentAuthenticatedUser();
            })
            .then((this_details: any) => {
                if (!(this_details && this_details.attributes))
                    throw "account creation fails";
                this_account_details = Object.assign({}, this_details.attributes);
                // signout
                return this_account.signOut();
            })
            .then(() => {
                console.warn(".. create_cognito: complete");
                resolve(this_account_details);
            })
            .catch((err: any) => {
                console.error(".. create_cognito: error");
                console.error(err);
                reject(err);
            });
    })
}
// will be pushed other file
// lambda function to be triggered to create new user
module.exports.createWebAppUser = async (event: APIGatewayProxyEvent, context: Context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const body = JSON.parse(event.body!)
    const userEmail = body.userEmail
    const password = body.password
    const userRole = body.userRole
    var params = {
        UserPoolId: userPoolID,
        Username: userEmail,
        DesiredDeliveryMediums: [
            'EMAIL'
        ],
        ForceAliasCreation: false,
        TemporaryPassword: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: userEmail
            },
            {
                Name: 'email_verified',
                Value: 'True'
            },
            {
                Name: "custom:role",
                Value: userRole
            }
            /* more items */
        ]
    };
    let responseBody: any
    let errorBody: any
    try {
        responseBody = await createUser(params, userEmail, password)
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