const globalAny: any = global;
import axios from "axios";
// import NodeCache from 'node-cache'
import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 });//init cache
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: "us-east-2_3ErdY8hH0",
    ClientId: ""
};
const pool_region = "us-east-2";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);



function logIn() {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: "",
        Password: ""
    });

    var userData = {
        Username: "",
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: any) {
            const { iat, exp, auth_time } = result.idToken.payload
            var idToken = result.getIdToken().getJwtToken();
            myCache.set("myTokens", idToken, 30)
            // callback(null, accesstoken);
        },
        onFailure: (function (err: any) {
            myCache.flushAll()
            // callback(err);
        })
    })
}
// https://x3vxs4134h.execute-api.us-east-2.amazonaws.com/dev/webV1/graphs?vehicleId=069bcc081a68a0832f123&alertId=102&alertName=vehicle active or idle&alertTypeId=7

function callApi() {
    const value = myCache.get("myTokens");
    console.log(myCache.has("myTokens"));
    myCache.has("myTokens") ?
        axios.get('https://x3vxs4134h.execute-api.us-east-2.amazonaws.com/dev/webV1/graphs', {
            params: {
                vehicleId: "069bcc081a68a0832f123",
                alertId: 123,
                alertName: "vehicle active or idle",
                alertTypeId: 7
            },
            headers: {
                'Authorization': `${myCache.get("myTokens")}`
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((e) => {
            console.log('errrr', e.response.status, e.response.statusText, e.response.data);
            if (e.response.data.message === "The incoming token has expired" || e.response.data.message === "Endpoint request timed out") {
                console.log("calling new token");
                logIn()
            }
        })
        : logIn()
}
let time = 0
// logIn()
setInterval(() => {
    callApi()
    console.log(myCache.get("myTokens"))
    time = time + 5
    console.log(time);
}, 5000)

// var id_token = 'eyJraWQiOiJYT0R0ZUFJa2JFUSswU1pCSkkzNDhjdVBuakwwSzJlYUFJeUl5TXJoUHlvPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjM2VmZTkwNS1kNmNkLTQ2MWUtYjYzMy01OTcxNmIyMGMzMDAiLCJhdWQiOiIyMDFydnA5Y2dhMXYwZm9pbTJhYWI2ZzNvZiIsImV2ZW50X2lkIjoiOTA1NzE5MGMtNjFmYy00OTBmLWJkNjEtYjA3ZmM3NDhkZjdjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTczOTcyMzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzNFcmRZOGhIMCIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6ImMzZWZlOTA1LWQ2Y2QtNDYxZS1iNjMzLTU5NzE2YjIwYzMwMCIsInBob25lX251bWJlciI6Iis5MTg4ODA1OTE1MTQiLCJleHAiOjE1OTc0MDA4MzEsImlhdCI6MTU5NzM5NzIzMX0.RGnN6fvep-S4Vkfy3lU2D5fQa3uEFeRqToRXksSb1O5qu_1pWOkojEJ9emR9VJrWC06FxTe7C8GmagSq23i1W8WiBiA2GlRbYGLHzUOcGf45bjm8cRF0-X-1RIgPgtFTXA1scQeNURLkwqfongiP9nhr8TtBpyLYKys-ooemMdspOzS2pC0su1X6EnmTY3HUxwgM2Iyrav3rGabGO-9kJO021vgULA4gB7PPvOCbcACO4EZm7xaf8buy-yfMh7dClxkpRjjQOtyloxqnJ3rk4DLxuHc1BiFeIwRCeCAwL71B5yvc53gNMq7ZFVE3l12lpk9XT_syQ3wjUtOFPAaBIA'  //expired token
// myCache.set("myTokens", id_token, 30)
