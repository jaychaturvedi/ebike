import Store, { TStore } from "./store";
import Action from "./actions/store";

export default (store: TStore = Store, params: Action): TStore => {
    console.log("Received", JSON.stringify(params), store)
    switch (params.type) {
        case "Store_UpdateBle":
            return {
                ...store,
                ble: {
                    ...store.ble,
                    ...params.payload
                }
            }
        case "Store_UpdateUser":
            return {
                ...store,
                user: {
                    ...store.user,
                    ...params.payload
                }
            }
        default: return store;
    }
}
