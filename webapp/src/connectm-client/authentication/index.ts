import Amplify, { Auth, } from "aws-amplify";

Amplify.configure({
    Auth: {
        region: "us-east-2",
        userPoolId: "us-east-2_4yqT9fdQs",
        userPoolWebClientId: "3t0apcbmln1ns8gp970j0lqjvg",
    }
})

export async function signout() {
    await Auth.signOut().then(async () => {});
}

export async function getToken() {
    try {
        const session = await Auth.currentSession()
        const token = session.getIdToken()
        console.log("TOken : ", token)
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

export function forgotPassword(username: string, code: string, password: string) {
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