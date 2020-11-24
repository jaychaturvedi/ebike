import {store} from '../';
import * as Authentication from '../authentication';
import {Store_Reset, Store_UpdateUser} from '../redux/actions/store';
import * as AuthenticationActions from '../redux/actions/saga/authentication-actions';
import * as User from '../redux/saga/user';

type Response = {success: boolean; message?: string};

//Onboarding
export async function signIn(
  params: AuthenticationActions.SignIn,
): Promise<Response> {
  const response = await Authentication.signIn(
    params.payload.mobileNumber,
    params.payload.password,
  );
  if (!response.success) {
    return {success: false, message: response.message};
  }
  const readUserResponse = await User.getUser();
  if (!readUserResponse.success) {
    return {success: false, message: readUserResponse.message};
  }
  await store.dispatch({
    type: 'Store_UpdateUser',
    payload: {
      id: readUserResponse.response.uid,
      email: readUserResponse.response.email,
      name: readUserResponse.response.fullName,
      phone: readUserResponse.response.phone,
      defaultBikeId: readUserResponse.response.frameId,
      isBikeRegistered: Boolean(readUserResponse.response.frameId),
      isLoggedIn: true,
    },
  } as Store_UpdateUser);
  return {success: true};
}

export async function signUp(
  params: AuthenticationActions.SignUp,
): Promise<Response> {
  const response = await Authentication.signup(params.payload.mobileNumber);
  return {success: response.success, message: response.message};
}

export async function resendSignUp(params: AuthenticationActions.ResendSignUp) {
  const response = await Authentication.resendSignUp(
    params.payload.mobileNumber,
  );
  return {success: response.success, message: response.message};
}

export async function confirmSignUp(
  params: AuthenticationActions.ConfirmSignUp,
) {
  const response = await Authentication.confirmSignUp(
    params.payload.mobileNumber,
    params.payload.code,
  );
  return {success: response.success, message: response.message};
}

export async function signOut(params: AuthenticationActions.SignOut) {
  await Authentication.signout();
  store.dispatch({
    type: 'Store_Reset',
    payload: {},
  } as Store_Reset);
}

export async function initForgotPassword(
  params: AuthenticationActions.InitiateForgotPassword,
) {
  const response = await Authentication.initiateForgotPassword(
    params.payload.mobileNumber,
  );
  return {success: response.success, message: response.message};
}

export async function completeForgotPassword(
  params: AuthenticationActions.CompleteForgotPassword,
) {
  const response = await Authentication.forgotPassword(
    params.payload.mobileNumber,
    params.payload.code,
    params.payload.password,
  );
  return {success: response.success, message: response.message};
}

export async function changePassword(
  params: AuthenticationActions.ChangePassword,
) {
  const response = await Authentication.changePassword(
    params.payload.mobileNumber,
    params.payload.oldPassword,
    params.payload.newPassword,
  );
  return {success: response.success, message: response.message};
}
