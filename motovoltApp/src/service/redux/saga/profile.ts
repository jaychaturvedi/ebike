import { put } from "redux-saga/effects";
import * as ProfileActions from "../actions/saga/profile";
import { Store_UpdateEnvironment } from "../actions/store";

export function* switchEnvironment(params: ProfileActions.SwitchEnvironment) {
  try {
    yield put({
      type: 'Store_UpdateEnvironment',
      payload: {
        production: params.payload.production,
        development:params.payload.development
      }
    } as Store_UpdateEnvironment)
  } catch (error) {
    yield put({
      type: 'Store_UpdateEnvironment',
      payload: {
        production: true,
        development:false
      }
    } as Store_UpdateEnvironment)
  }
}