import {
    put,
} from "redux-saga/effects";
import * as MenuActions from "../actions/saga/menu";
import { Store_SetFAQ } from "../actions/store";
import { config, request } from "./utils";

export function* readFAQ(params: MenuActions.ReadFAQ) {
    try {
        const dataResponse = yield request(`${config.baseUrl}/feature/faq`,
            "GET", undefined);
        if (dataResponse.success) {
            const data = dataResponse.response.body;
            yield put({
                type: 'Store_SetFAQ',
                payload: Object.assign({}, ...data.sections.map((feature: any) => {
                    return {
                        [feature.name]: {
                            name: feature.name,
                            icon: feature.icon,
                            faq: feature.faq
                        }
                    }
                }))
            } as Store_SetFAQ)
        }
    } catch (error) {
        console.log(error)
    }
}
