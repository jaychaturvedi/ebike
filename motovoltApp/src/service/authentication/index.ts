import Amplify, { Auth, } from "aws-amplify";
import ObjectId from "../object-id";

Amplify.configure({
    Auth: {
        region: "us-east-1",
        userPoolId: "us-east-2_3ErdY8hH0",
        userPoolWebClientId: "201rvp9cga1v0foim2aab6g3of",
    }
})

export async function signup(phoneNumber: string) {
    return Auth.signUp({
        username: phoneNumber,
        password: `${ObjectId()}${phoneNumber}A@`,
    }).then((res) => {
        console.log(JSON.stringify(res));
        return {
            success: true,
            username: res.user.getUsername(),
            userConfirmed: res.userConfirmed,
            userSub: res.userSub,
            message: "User created"
        }
    }).catch(err => {
        console.log(err)
        return {
            success: false,
            message: err.message || "Unknown Error",
            username: '',
            userConfirmed: false,
            userSub: '',
        }
    });
}

export async function signout() {
    await Auth.signOut();
}

export function getVerificationOtp(phoneNumber: string) {
    return Auth.signIn(phoneNumber).then(user => {
        console.log(user)
        return {
            user,
            message: "Otp Sent",
            success: true,
        }
    }).catch(err => {
        console.log("Err", err);
        return {
            user: null,
            message: "Invalid Phone Number",
            success: false,
        }
    })
}

export function validateOtp(user: any, otp: string) {
    return Auth.sendCustomChallengeAnswer(user, otp)
        .then((usr) => {
            return {
                message: "OTP Verified",
                success: true
            }
        }).catch(err => {
            console.log(err)
            return {
                message: "OTP verification failed",
                success: false,
            }
        })
}

export function getUser() {
    return Auth.currentAuthenticatedUser().then(user => {
        return {
            user,
            success: false,
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

export function initiateForgotPassword(username: string) {
    return Auth.forgotPassword(username)
        .then(() => {
            return {
                success: true,
                message: "Forgot password initiated successfully"
            }
        }).catch(err => {
            return {
                success: true,
                message: err.message
            }
        })
}

export function forgotPassword(username: string, code: string, password: string) {
    Auth.forgotPasswordSubmit(username, code, password)
        .then(() => {
            return {
                success: true,
                message: "Password Reset Successfull"
            }
        }).catch(err => {
            return {
                success: true,
                message: err.message
            }
        })
}