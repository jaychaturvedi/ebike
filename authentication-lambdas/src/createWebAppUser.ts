const AWS = require('aws-sdk');
const globalAny: any = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null

const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;

const tempPassword = "Temp@1234"
const userEmail = "example@gmail.com"
const userRole = "ADMIN"

const userPoolRegion = 'us-east-2'
const userPoolID = 'us-east-xxxxxx'
const userPoolWebClientID = 'xxxxxxxns8gp970j0lqjvg'

const accessKeyId = ''
const secretAccessKey = ''
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
var params = {
    UserPoolId: userPoolID,
    Username: userEmail,
    DesiredDeliveryMediums: [
        'EMAIL'
    ],
    ForceAliasCreation: false,
    TemporaryPassword: tempPassword,
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

function createUser() {
    let this_account: any = undefined;
    let this_account_details: any = undefined
    if (!Auth.configure())
        return Promise.reject("could not configure amplify");

    return new Promise((resolve, reject) => {
        client.adminCreateUser(params)
            .promise()
            .then((user: any) => {
                console.log("created User", user)
                return Auth.signIn(user.User.Username, tempPassword);
            })
            .then((user: any) => {
                return Auth.completeNewPassword(user, tempPassword, {
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

createUser()
    .then((userDetails: any) => {
        console.log(userDetails)
    })
    .catch(err => console.log(err))
