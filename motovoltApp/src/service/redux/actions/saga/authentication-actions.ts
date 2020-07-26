export type InitiateMobileValidation = {
    type: "InitiateMobileValidation",
    payload: {
        mobileNumber: string,
    }
}

export type ValidateMobile = {
    type: "ValidateMobile",
    payload: {
        code: string,
    }
}

export type SignIn = {
    type: "SignIn",
    payload: {
        mobileNumber: string,
        password: string,
    }
}

export type SignUp = {
    type: "SignUp",
    payload: {
        mobileNumber: string,
    }
}

export type InitiateForgotPassword = {
    type: "InitiateForgotPassword",
    payload: {
        mobileNumber: string,
    }
}

export type CompleteForgotPassword = {
    type: "CompleteForgotPassword",
    payload: {
        mobileNumber: string,
        code: string,
        password: string,
    }
}


