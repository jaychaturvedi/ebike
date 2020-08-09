import { eventChannel } from "redux-saga";
import {
    call,
    put,
} from "redux-saga/effects";
import * as Authentication from "../../authentication";
import * as AuthenticationActions from "../actions/saga/authentication-actions";
import { Store_UpdateOnboarding, Store_UpdateUser } from "../actions/store";


//Onboarding
export function* signIn(params: AuthenticationActions.SignIn) {
    const response = yield call(Authentication.signIn, params.payload.mobileNumber, params.payload.password)
    // call fetch user API
    console.log(response.user)
    yield put({
        type: 'Store_UpdateUser',
        payload: {
            isLoggedIn: response.success,
        }
    } as Store_UpdateUser);
    yield put({
        type: 'Store_UpdateOnboarding',
        payload: {
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding);
}

export function* signUp(params: AuthenticationActions.SignUp) {
    const response = yield call(Authentication.signup, params.payload.mobileNumber)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            signUpSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

export function* resendSignUp(params: AuthenticationActions.ResendSignUp) {
    const response = yield call(Authentication.resendSignUp, params.payload.mobileNumber);
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            errorMessage: response.message,
        }
    } as Store_UpdateOnboarding)
}

export function* confirmSignUp(params: AuthenticationActions.ConfirmSignUp) {
    const response = yield call(Authentication.confirmSignUp, params.payload.mobileNumber, params.payload.code)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            confirmSignUpSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

export function* signOut(params: AuthenticationActions.SignOut) {
    yield call(Authentication.signout)
    yield put({
        type: 'Store_UpdateUser',
        payload: {
            isLoggedIn: false
        }
    } as Store_UpdateUser)
}

export function* initForgotPassword(params: AuthenticationActions.InitiateForgotPassword) {
    yield call(Authentication.initiateForgotPassword, params.payload.mobileNumber)
}

export function* completeForgotPassword(params: AuthenticationActions.CompleteForgotPassword) {
    const response = yield call(Authentication.forgotPassword,
        params.payload.mobileNumber, params.payload.code, params.payload.password);
    console.log("Response", response)
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            passwordResetSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}

export function* changePassword(params: AuthenticationActions.ChangePassword) {
    const response = yield call(Authentication.changePassword,
        params.payload.mobileNumber, params.payload.oldPassword, params.payload.newPassword);
    yield put({
        type: "Store_UpdateOnboarding",
        payload: {
            passwordResetSuccess: response.success,
            errorMessage: response.success ? "" : response.message,
        }
    } as Store_UpdateOnboarding)
}
