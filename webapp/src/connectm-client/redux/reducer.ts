import connectmState, { State } from "./connectm-state";
import { IUsersAction } from "../actions/user"
type ActionParams = IUsersAction

const AppReducer = (state: State = connectmState, actionParams: ActionParams) => {
    switch (actionParams.type) {
        case "RECEIVED_USER": {
            return {
                ...state,
                user: actionParams.payload
            }
        }
        default: {
            return state
        }
    }
}

export default AppReducer;