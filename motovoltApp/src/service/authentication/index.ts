import Amplify, { Auth } from "aws-amplify";
import ObjectId from "../object-id";

Amplify.configure({
    Auth: {}
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
            console.log({
                message: "OTP Verified",
                success: true
            }, usr)
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

    Auth.currentAuthenticatedUser().then(user => {
        console.log("Auth", user)
    })
}