import { eventChannel } from "redux-saga";
import {
    call,
    put,
} from "redux-saga/effects";
import * as Authentication from "../../authentication";
import * as User from "../saga/user";
import * as AuthenticationActions from "../actions/saga/authentication-actions";
import { Store_UpdateOnboarding, Store_UpdateUser, Store_Reset, Store_UpdateError } from "../actions/store";
import {UnknownError} from '../../server-error';

//Onboarding
export function* signIn(params: AuthenticationActions.SignIn) {
    const response = yield call(Authentication.signIn, params.payload.mobileNumber, params.payload.password)
    if (!response.success) {
        yield put({
            type: 'Store_UpdateOnboarding',
            payload: {
                errorMessage: response.success ? "" : response.message,
            }
        } as Store_UpdateOnboarding);
        return;
    }
    const readUserResponse = yield call(User.getUser);
    if (!readUserResponse.success) {
        yield put({
            type: 'Store_UpdateError',
            payload: {
                error: readUserResponse.success ? "" : readUserResponse.message,
            }
        } as Store_UpdateError);
        return;
    }
    yield put({
        type: "Store_UpdateUser",
        payload: {
            id: readUserResponse.response.uid,
            email: readUserResponse.response.email,
            name: readUserResponse.response.fullName,
            phone: readUserResponse.response.phone,
            defaultBikeId: readUserResponse.response.frameId,
            isBikeRegistered: Boolean(readUserResponse.response.frameId),
            isLoggedIn: true,
        }
    } as Store_UpdateUser)
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
    } as Store_UpdateOnboarding);
}

export function* signOut(params: AuthenticationActions.SignOut) {
    yield call(Authentication.signout)
    yield put({
        type: 'Store_Reset',
        payload: {}
    } as Store_Reset)
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
