const globalAny: any = global;
import axios from "axios";
import * as dotenv from "dotenv"
dotenv.config()
import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 });//init cache
globalAny.fetch = require("node-fetch");
globalAny.navigator = () => null
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

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
    myCache.has("myTokens") ?
        axios.get(process.env.WEBURL!, {
            params: {
                vehicleId: "069bcc081a68a0832f123",
                alertId: 123,
                alertName: "vehicle active or idle",
                alertTypeId: 1
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

    myCache.has("myTokens") ?
        axios.get(process.env.WEBURL!, {
            params: {
                vehicleId: "069bcc081a68a0832f123",
                alertId: 123,
                alertName: "vehicle active or idle",
                alertTypeId: 2
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

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 3
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "069bcc081a68a0832f123",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 4
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 5
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 6
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 7
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 8
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 9
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })

    axios.get(process.env.WEBURL!, {
        params: {
            vehicleId: "BLR 327490",
            alertId: 123,
            alertName: "vehicle active or idle",
            alertTypeId: 10
        }
    }).then((res) => {
        console.log(res.data);
    }).catch((e) => {
        console.log('errrr', e.response.status, e.response.statusText, e.response.data);
    })
}
let time = 0
setInterval(() => {
    callApi()
    console.log(myCache.get("myTokens"))
    time = time + 5
    console.log(time);
}, 5000)

