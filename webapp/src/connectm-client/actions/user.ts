import { Dispatch } from "redux";
import { State } from "../redux/connectm-state";

type UserActions = "RECEIVED_USER" | "GET_USER";

export interface IUsersAction {
    type: UserActions,
    payload: any
}

export function UsersAction(params: IUsersAction) {
    return {
        type: params.type,
        payload: params.payload
    }
}

export interface ReduxUserAction {
    usersAction: (params: IUsersAction) => IUsersAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxUserAction {
    return {
        usersAction: (params: IUsersAction) => dispatch(UsersAction(params))
    }
}

export interface ReduxUserState {
    user: State["user"]
}

export function mapStateToProps(state: State): ReduxUserState {
    return {
        user: state.user
    }
}