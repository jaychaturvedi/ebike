import Store, { TStore, ZeroOnboarding, ZeroRide } from "./store";
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
                    ...params.payload,
                    isStale: false,
                }
            }
        case "Store_UpdateOnboarding":
            return {
                ...store,
                onboarding: {
                    ...store.onboarding,
                    ...params.payload,
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
                    ...params.payload,
                    isStale: false,
                }
            }
        case 'Store_UpdateNotification':
            return {
                ...store,
                notifications: {
                    ...store.notifications,
                    ...params.payload,
                }
            }
        case 'Store_UpdateRide':
            return {
                ...store,
                ride: {
                    ...store.ride,
                    ...params.payload
                },
            }
        case 'Store_SetRideHistory':
            return {
                ...store,
                ride: ZeroRide,
                rides: Object.assign({}, ...params.payload.map(ride => ({ [ride.id]: ride })))
            }
        case 'Store_SetServices':
            return {
                ...store,
                services: {
                    services: Object.assign({}, ...params.payload.services.map(service => ({ [service.id]: service }))),
                    open: params.payload.open,
                    closed: params.payload.closed
                }
            }
        default: return store;
    }
}
