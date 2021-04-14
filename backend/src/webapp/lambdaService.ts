const AWS = require('aws-sdk');
import * as dotenv from "dotenv"
dotenv.config()
const globalAny: any = global;
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null

const Amplify = require("@aws-amplify/core").default;
const Auth = require("@aws-amplify/auth").default;

const userPoolRegion = process.env.REGION
const userPoolID = process.env.WEBAPPUSERPOOLID//zelp_web_authentication
const userPoolWebClientID = process.env.WEBAPPUSERPOOLWEBCLIENTID

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

type TUser = {
  userEmail: string;
  password: string;
  userRole: string;
  userGroup: string;
}

// lambda function to be triggered to create new user
export const createWebAppUser = async (body: TUser) => {
  const userEmail = body.userEmail
  const password = body.password
  const userRole = body.userRole
  const userGroup = body.userGroup
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
        Name: "custom:group",
        Value: userGroup
      },
      {
        Name: "custom:role",
        Value: userRole
      },
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
  const response = { response: responseBody, err: errorBody }
  return response
};

type TDeleteUser = {
  userEmail: string
}
export const deleteWebAppUser = async (body: TDeleteUser) => {
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
  const response = { response: responseBody, err: errorBody }
  return response
};

export const signIn = async (body: { userEmail: string, password: string }) => {
  const userEmail = body.userEmail
  const password = body.password
  var params = {
    UserPoolId: userPoolID,
    Username: userEmail
  };
  let responseBody: any
  let errorBody: any
  try {
    await Auth.signIn(userEmail, password);
    const session = await Auth.currentSession()
    const token = await session.getIdToken()
    responseBody = token
    console.log(responseBody)
  }
  catch (e) {
    console.log(e)
    errorBody = e
  }
  const response = { response: responseBody, err: errorBody }
  return response
};