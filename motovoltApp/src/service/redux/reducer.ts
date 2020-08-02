import Store, { TStore, ZeroOnboarding } from "./store";
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
        case "Store_UpdateOnboarding":
            return {
                ...store,
                onboarding: {
                    ...store.onboarding,
                    ...params.payload
                }
            }
        case "Store_ResetOnboarding":
            return {
                ...store,
                onboarding: ZeroOnboarding
            }
        case "Store_UpdateBike":
            return {
                ...store,
                bike: {
                    ...store.bike,
                    ...params.payload
                }
            }
        default: return store;
    }
}
