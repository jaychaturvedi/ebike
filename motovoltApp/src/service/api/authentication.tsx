import {store} from '../';
import * as Authentication from '../authentication';
import {Store_UpdateUser} from '../redux/actions/store';
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
