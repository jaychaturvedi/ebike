const globalAny: any = global;
import axios from "axios";
import NodeCache from "node-cache";
import middleware from "./middleware";
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 });//init cache
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import * as dotenv from "dotenv"
dotenv.config()

const poolData = {
    UserPoolId: process.env.USERPOOLID,
    ClientId: process.env.CLIENTID
};
const pool_region = process.env.REGION;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function logIn() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: process.env.AWSUSERNAME,
        Password: process.env.AWSPASSWORD
    });

    var userData = {
        Username: process.env.AWSUSERNAME,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: any) {
            const { iat, exp, auth_time } = result.idToken.payload
            var idToken = result.getIdToken().getJwtToken();
            myCache.set("myTokens", idToken, 3600)
        },
        onFailure: (function (err: any) {
            myCache.flushAll()
        })
    })
}

function callApi() {
    const token = myCache.has("myTokens") ? myCache.get("myTokens") : '';
    console.log(myCache.has("myTokens"));
    if (token) {
        axios.get(process.env.APPURL!, {
            headers: {
                'Authorization': `${myCache.get("myTokens")}`
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log('errrr', e.response.status, e.response.statusText, e.response.data);
            if (e.response.data.message === "The incoming token has expired") {
                console.log("calling new token");
                logIn()
            }
        })
    }
    else logIn()
}

let time = 0
setInterval(() => {
    callApi()
    console.log(myCache.get("myTokens"))
    time = time + 5
    console.log(time);
}, 5000)
