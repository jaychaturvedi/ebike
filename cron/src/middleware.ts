import axios from "axios";
import JwtDecode from "jwt-decode";
import jwt from "jsonwebtoken"
import jwkToPem from 'jwk-to-pem'
import * as dotenv from "dotenv"
dotenv.config()
const poolData = {
    UserPoolId: process.env.USERPOOLID,
    region: process.env.REGION
};

const middleware = async (token: string) => {
    try {
        const publicKey = await axios.get(`https://cognito-idp.${poolData.region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
            { responseType: "json" }
        )
        console.log("data:", publicKey.data);
        const body = publicKey.data
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
        console.log("json decoded:", decodedJwt);
        if (!decodedJwt) {
            console.log("Not a valid JWT token");
            return -2
        }
        var kid = decodedJwt.header.kid;
        pem = pems[kid];
        console.log("pemm", pem);
        if (!pem) {
            console.log('Invalid token');
        }
        jwt.verify(token, pem, function (err, payload) {
            if (err) {
                console.log("Invalid Token.");
                return -1
            } else {
                console.log("Valid Token.");
                //if token valid decode from token
                const { sub: uid, phone_number: phone, phone_number_verified } = JwtDecode(token)
                return { uid, phone }
            }
        });
    }
    catch (e) {
        console.log(e);
        return e
    }
}

export default middleware