import Amplify, { Auth, } from "aws-amplify";
import ObjectId from "../object-id";
import { storeCredentials, fetchCredentials, resetCredentials } from '../secure-storage'

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
        console.log("************LOOK HERE ***********")
        console.log(err)
        if (err.code === 'UsernameExistsException') {
            return Auth.signIn({ username: phoneNumber, password }).then(user => {
                throw err;
            }).catch(signInErr => {
                console.log("************LOOK HERE 2***********")
                if (signInErr.code === "UserNotConfirmedException") {
                    return {
                        success: true,
                        user: null,
                        username: '',
                        userConfirmed: false,
                        userSub: '',
                        message: "User Not confirmed"
                    }
                }
                return {
                    success: false,
                    user: null,
                    message: err.message || "Unknown Error",
                    username: '',
                    userConfirmed: false,
                    userSub: '',
                }
            })
        }
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
    return Auth.confirmSignUp(mobileNumber, code).then(async (data) => {
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
    await Auth.signOut().then(async () => {
        await resetCredentials();
    });
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
    return Auth.signIn({ username, password }).then(async user => {
        await storeCredentials(username, password)
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

export function changePassword(mobileNumber: string, oldpassword: string, newpassword: string,) {
    return getUser().then(async response => {
        if (response.success) {
            return Auth.changePassword(response.user, oldpassword, newpassword)
                .then(async res => {
                    await storeCredentials(mobileNumber, newpassword);
                    console.log(await fetchCredentials())
                    return {
                        success: true
                    }
                })
        }
        throw new Error("User not authenticated");
    }).catch(err => {
        console.log(err)
        return {
            success: false
        }
    })
}