import Amplify, { Auth, } from "aws-amplify";
import * as dotenv from "dotenv"
dotenv.config()

Amplify.configure({
    Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_WEBAPPUSERPOOLID,
        userPoolWebClientId: process.env.REACT_APP_WEBAPPUSERPOOLWEBCLIENTID,
    }
})

export async function signout() {
    await Auth.signOut().then(async () => {});
}

export function getUser() {
    return Auth.currentAuthenticatedUser().then((user) => {
        return {
            user,
            success: true,
            message: null
        };
    }).catch(err => {
        return {
            message: err.message,
            success: false,
            user: null
        }
    })
}

export async function getToken() {
    try {
        const session = await Auth.currentSession()
        const token = session.getIdToken()
        return {
            success: true,
            token: token.getJwtToken(),
            message: "Success"
        }
    } catch (error) {
        return {
            success: false,
            token: null,
            message: "Error getting token"
        }
    }
}

export function signIn(username: string, password: string) {
    return Auth.signIn({ username, password }).then(async user => {
        console.log("Logged in :", user)
        console.log(await getToken())
        return {
            user,
            success: true,
            message: "User signed in"
        };
    }).catch(err => {
        console.log("Error", err);
        return {
            message: err.message,
            success: false,
            user: null
        }
    })
}

export function forgotPasswordSubmit(username: string, code: string, password: string) {
    return Auth.forgotPasswordSubmit(username, code, password)
        .then(async () => {
            return {
                success: true,
                message: "Password Reset Successfull"
            }
        }).catch(err => {
            return {
                success: false,
                message: err.message
            }
        })
}

export function initiateForgotPassword(username: string) {
    return Auth.forgotPassword(username)
        .then((data) => {
            console.log(data);
            return {
                success: true,
                message: "Forgot password initiated successfully"
            }
        }).catch(err => {
            console.log(err);
            return {
                success: false,
                message: err.message
            }
        })
}