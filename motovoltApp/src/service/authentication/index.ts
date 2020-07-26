import Amplify, { Auth, } from "aws-amplify";
import ObjectId from "../object-id";
import { storeCredentials, fetchCredentials } from '../secure-storage'

Amplify.configure({
    Auth: {
        region: "us-east-1",
        userPoolId: "us-east-2_3ErdY8hH0",
        userPoolWebClientId: "201rvp9cga1v0foim2aab6g3of",
    }
})

export async function signup(phoneNumber: string) {
    const password = `${phoneNumber}motovOlt@`
    return Auth.signUp({
        username: phoneNumber,
        password: password,
    }).then(async (res) => {
        console.log(JSON.stringify(res));
        await storeCredentials(phoneNumber, password)
        console.log(await fetchCredentials())
        return {
            success: true,
            user: res.user,
            username: res.user.getUsername(),
            userConfirmed: res.userConfirmed,
            userSub: res.userSub,
            message: "User created"
        }
    }).catch(err => {
        console.log(err)
        return {
            success: false,
            user: null,
            message: err.message || "Unknown Error",
            username: '',
            userConfirmed: false,
            userSub: '',
        }
    });
}

export async function resendSignUp(phoneNumber: string) {
    return Auth.resendSignUp(phoneNumber).then((res) => {
        console.log(JSON.stringify(res));
        return {
            success: true,
            message: "OTP Sent"
        }
    }).catch(err => {
        console.log(err)
        return {
            success: false,
            message: err.message || "Unknown Error",
        }
    });
}

export async function confirmSignUp(mobileNumber: string, code: string) {
    return Auth.confirmSignUp(mobileNumber, code).then((data) => {
        return {
            success: true,
            message: "Success"
        }
    }).catch(err => {
        return {
            success: false,
            message: err.message || "Unknown Error",
        }
    })
}

export async function signout() {
    await Auth.signOut();
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

export function initiateForgotPassword(username: string) {
    return Auth.forgotPassword(username)
        .then(() => {
            return {
                success: true,
                message: "Forgot password initiated successfully"
            }
        }).catch(err => {
            return {
                success: false,
                message: err.message
            }
        })
}

export function forgotPassword(username: string, code: string, password: string) {
    return Auth.forgotPasswordSubmit(username, code, password)
        .then(async () => {
            await storeCredentials(username, password)
            console.log(await fetchCredentials())
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

export function signIn(username: string, password: string) {
    return Auth.signIn({ username, password }).then(user => {
        console.log(user)
        return {
            user,
            success: true,
            message: "User signed in"
        };
    }).catch(err => {
        return {
            message: err.message,
            success: false,
            user: null
        }
    })
}

export function changePassword(mobileNumber: string, oldpassword: string, newpassword: string,) {
    return getUser().then(async response => {
        if (response.success) {
            await storeCredentials(mobileNumber, newpassword);
            console.log(await fetchCredentials())
            return Auth.changePassword(response.user, oldpassword, newpassword)
                .then(res => {
                    return {
                        success: true
                    }
                })
        }
        throw new Error("User not authenticated");
    }).catch(err => {
        return {
            success: false
        }
    })
}