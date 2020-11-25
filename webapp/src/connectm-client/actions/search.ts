import { Dispatch } from "redux";
import { State } from "../redux/connectm-state"
export type SearchActions = "GET_SEARCH_OPTIONS"

export interface SearchPayload {
    frameId: string,
    pageNo: number,
    pageSize: number
}

export interface ISearchAction {
    type: SearchActions,
    payload: SearchPayload
}

export function SearchAction(params: ISearchAction): ISearchAction {
    return {
        type: params.type,
        payload: params.payload
    }
}

export interface ReduxSearchOptionAction {
    getSearchOptions: (params: ISearchAction) => ISearchAction
}

export function mapDispatchToProps(dispatch: Dispatch): ReduxSearchOptionAction {
    return {
        getSearchOptions: (params: ISearchAction) => dispatch(SearchAction(params))
    }
}
export interface ReduxSearchOptionState {
    searchOptions: State["searchOptions"]
}

export function mapStateToProps(state: State): ReduxSearchOptionState {
    return {
        searchOptions: state.searchOptions
    }
}