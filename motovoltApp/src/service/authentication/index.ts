import Amplify, { Auth, } from "aws-amplify";
import { UnknownError } from "../server-error";
import { storeCredentials, fetchCredentials, resetCredentials } from '../secure-storage'

Amplify.configure({
    Auth: {
        region: "us-east-1",
        userPoolId: "us-east-2_3ErdY8hH0",
        userPoolWebClientId: "201rvp9cga1v0foim2aab6g3of",
    }
})

export async function signup(phoneNumber: string) {
    console.log("Got here in sigup", phoneNumber)
    await signout();
    await storeCredentials(phoneNumber, "DUMMY_PASSWORD");
    const password = `${phoneNumber}motovOlt@`
    console.log("Trying signup")
    return Auth.signUp({
        username: phoneNumber,
        password: password,
    }).then(async (res) => {
        console.log("Signup sucess", JSON.stringify(res))
        return {
            success: true,
            user: res.user,
            username: res.user.getUsername(),
            userConfirmed: res.userConfirmed,
            userSub: res.userSub,
            message: "User created"
        }
    }).catch(err => {
        console.log("Signup failed", JSON.stringify(err));
        if (err.code !== 'UsernameExistsException') {
            return {
                success: false,
                user: null,
                message: UnknownError,
                username: '',
                userConfirmed: false,
                userSub: '',
            }
        }
        console.log("Signing in user")
        return Auth.signIn({ username: phoneNumber, password })
            .then(async user => {
                console.log("Signin sucess");
                throw err;
            })
            .catch(async signInErr => {
                console.log("Error after signin", signInErr);
                if (signInErr.code === "UserNotConfirmedException") {
                    console.log("User not confirmed")
                    await Auth.resendSignUp(phoneNumber);
                    return {
                        success: true,
                        user: null,
                        username: '',
                        userConfirmed: false,
                        userSub: '',
                        message: "User registered but not confirmed"
                    }
                }
                if (err.code === "UsernameExistsException") {
                    console.log("User exists")
                    return {
                        success: false,
                        user: null,
                        username: '',
                        userConfirmed: false,
                        userSub: '',
                        message: "User with given phone number already exists. Please login to continue."
                    }
                }
                console.log("Unknown error", signInErr)
                return {
                    success: false,
                    user: null,
                    message: UnknownError,
                    username: '',
                    userConfirmed: false,
                    userSub: '',
                }
            }).catch(err => {
                if (err.code === "LimitExceededException") {
                    return {
                        success: false,
                        user: null,
                        username: '',
                        userConfirmed: false,
                        userSub: '',
                        message: "Attempt limit exceeded, please try after some time."
                    }
                }
                console.log("Erorr signining in", err)
                return {
                    success: false,
                    user: null,
                    message: UnknownError,
                    username: '',
                    userConfirmed: false,
                    userSub: '',
                }
            })
    }).catch(err => {
        console.log("Error signinup", err)
        return {
            success: false,
            user: null,
            message: UnknownError,
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
            message: "We have sent the OTP to the mobile number provided."
        }
    }).catch(err => {
        console.log(err)
        if (err.code === "LimitExceededException") {
            return {
                success: false,
                message: err.message,
            }
        }
        return {
            success: false,
            message: UnknownError,
        }
    });
}

export async function confirmSignUp(mobileNumber: string, code: string) {
    return Auth.confirmSignUp(mobileNumber, code).then(async (data) => {
        await Auth.signIn({ username: mobileNumber, password: `${mobileNumber}motovOlt@` });
        return {
            success: true,
            message: "Success"
        }
    }).catch(err => {
        return {
            success: false,
            message: UnknownError,
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
        console.log(err);
        return {
            message: UnknownError,
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
                message: UnknownError
            }
        })
}

export function forgotPassword(username: string, code: string, password: string) {
    return Auth.forgotPasswordSubmit(username, code, password)
        .then(async () => {
            await resetCredentials();
            return {
                success: true,
                message: "Password Reset Successfull"
            }
        }).catch(err => {
            console.log(err)
            return {
                success: false,
                message: UnknownError
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
            message: UnknownError,
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
            message: UnknownError
        }
    }
}

export function changePassword(mobileNumber: string, oldpassword: string, newpassword: string,) {
    return getUser().then(async response => {
        if (response.success) {
            return Auth.changePassword(response.user,
                oldpassword === "DUMMY_PASSWORD" ? `${mobileNumber}motovOlt@` : oldpassword, newpassword)
                .then(async res => {
                    await storeCredentials(mobileNumber, newpassword);
                    console.log(await fetchCredentials())
                    return {
                        message: "",
                        success: true
                    }
                })
        }
        throw new Error("User not authenticated");
    }).catch(err => {
        console.log(err)
        return {
            success: false,
            message: UnknownError
        }
    })
}