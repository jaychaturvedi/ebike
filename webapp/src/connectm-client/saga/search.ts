import { TSearchOptions } from "../redux/models"
import axios from "axios"
import { call, put } from "redux-saga/effects"
import { ISearchAction } from "../actions/search"

const delay = (ms: number) => new Promise(response => setTimeout(response, ms))

export type Store_SearchOptions = {
    type: "STORE_SEARCH_OPTIONS",
    payload: {
        searchOptions: TSearchOptions[]
    }
}

export type TAlertsTrendData = {
    searchOptions: TSearchOptions[]
}

export function* getSearchOptions(params: ISearchAction) {
    try {
        const data: TSearchOptions[] = yield call(fetchSearchOptions, params)
        yield put({
            type: "STORE_SEARCH_OPTIONS",
            payload: {
                searchOptions: data
            }
        } as Store_SearchOptions)
    } catch (error) {
        console.log("get search options error", error)
    }
}

async function fetchSearchOptions(params: ISearchAction) {
    let response = [];
    response = await SearchOptions(params)
    const data: TSearchOptions[] = response
    return data
}

async function SearchOptions(params: ISearchAction) {
    const response = await axios.post(process.env.REACT_APP_OLDWEBAPPAPI+'/vehsearch',
        {
            frameId: params.payload.frameId,
            pageNo: params.payload.pageNo,
            pageSize: params.payload.pageSize
        }, { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data as TSearchOptions[]
}