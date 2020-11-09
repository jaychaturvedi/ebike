import axios from "axios";
import JwtDecode from "jwt-decode";
import jwt from "jsonwebtoken"
import jwkToPem from 'jwk-to-pem'
import { get, post, put } from 'request-promise'
import * as dotenv from "dotenv"
dotenv.config()
const poolData = {
    UserPoolId: process.env.USERPOOLID,
    region: process.env.REGION
};

const middleware = async (token: string) => {
    try {
        //get public key from aws
        // const publicKey = await axios.get(`https://cognito-idp.${poolData.region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        //     { responseType: "json" }
        // )
        const options = {
            uri: `https://cognito-idp.${poolData.region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
            headers: {
                'Content-Type': 'application/json',
            },
            json: true
        };
        const publicKey = await get(options)
        // console.log("got publickey", publicKey);
        const body = publicKey
        let pems: any = {};
        var keys = body['keys'];
        for (var i = 0; i < keys.length; i++) {
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
        }
        //jwt decode return signatue og token
        var decodedJwt = jwt.decode(token, { complete: true }) as any;
        // console.log("json decoded:", decodedJwt);
        if (!decodedJwt) {
            return { valid: false, message: "Not a valid JWT token" }
        }
        var kid = decodedJwt.header.kid;
        pem = pems[kid];
        if (!pem) {
            console.log('Invalid token');
            return { valid: false, message: "Invalid token" }
        }
        const verified = jwt.verify(token, pem, function (err, payload) {
            if (err) {
                console.log("Expired Token.");
                return { valid: false, message: "Expired token" }
            } else {
                console.log("Valid Token.");
                const { sub: uid, phone_number: phone, phone_number_verified } = JwtDecode(token)
                console.log(uid);
                return { valid: true, message: "Valid JWT token" }
            }
        });
        return verified
    }

    catch (e) {
        console.log(e);
        return { valid: false, message: "Invalid token" }
    }
}

export default middleware