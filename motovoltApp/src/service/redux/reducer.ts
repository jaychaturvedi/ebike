import Store, {
    TStore, ZeroOnboarding, ZeroRide, getZeroState,
    ZeroUser, ZeroBLE, ZeroSpeedometer, ZeroGraph
} from "./store";
import Action from "./actions/store";

export default (store: TStore = Store, params: Action): TStore => {
    console.log("Received", JSON.stringify(params), store)
    switch (params.type) {
        case "Store_Reset":
            return getZeroState();
        case "Store_Init":
            return {
                ...store,
                ble: ZeroBLE,
                onboarding: ZeroOnboarding,
                speedometer: ZeroSpeedometer,
                user: ZeroUser
            }
        case "Store_ResetRide":
            return {
                ...store,
                ride: {
                    ...ZeroRide,
                },
                speedometer: {
                    ...ZeroSpeedometer
                }
            }
        case "Store_ResetStats":
            return {
                ...store,
                graph: ZeroGraph,
                rides: {},
            }
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
        case 'Store_ResetReportIssue':
            return {
                ...store,
                bike: {
                    ...store.bike,
                    reportIssueSuccess: null
                }
            }
        case 'Store_UpdateError':
            return {
                ...store,
                error: params.payload.error
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
                    data: {
                        // ...store.notifications.data,
                        ...params.payload.data
                    }
                }
            }
        case 'Store_ClearNotification':
            return {
                ...store,
                notifications: {
                    ...store.notifications,
                    isPresent: false,
                    data: {}
                }
            }
        case 'Store_UpdateRide':
            return {
                ...store,
                ride: {
                    ...ZeroRide,
                    ...params.payload,
                    isStale: false
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
        case 'Store_SetSpeedometer':
            return {
                ...store,
                speedometer: { ...store.speedometer, ...params.payload }
            }
        case 'Store_SetGraphdata':
            return {
                ...store,
                graph: {
                    isStale: false,
                    avgKmph: params.payload.avgKmph,
                    avgSpeed: params.payload.avgSpeed,
                    distance: params.payload.distance,
                    topSpeed: params.payload.topSpeed,
                    co2SavingKg: params.payload.co2SavingKg,
                    greenMilesKm: params.payload.greenMilesKm,
                    data: Object.assign({}, ...params.payload.data.map(graph => ({ [Math.random().toString()]: graph })))
                }
            }
        case 'Store_SetFAQ':
            return {
                ...store,
                faq: params.payload
            }
        case 'Store_SetUpgrades':
            console.log("In reducer");
            return {
                ...store,
                upgrades: params.payload
            }
        case "Store_SetNearByServices":
            return {
                ...store,
                nearbyServices: params.payload
            }
        case 'Store_ResetNearByServices':
            return {
                ...store,
                nearbyServices: []
            }
        case 'Store_SmartInspectionReport':
          return {
              ...store,
              smartInspectReport: params.payload.smartInspectReport
          }
        case 'Store_UpdateEnvironment':
          return {
              ...store,
              apiEnvironment: {
                production:params.payload.production,
                development: params.payload.development
              }
        }
        case 'StoreServiceProviders':
          return {
            ...store,
            requestedServices:{
              ...store.requestedServices,
              nearbyServiceProviders: params.payload
            }
          }
        case 'StorePastBookedServices':
          return {
            ...store,
            requestedServices:{
              ...store.requestedServices,
              pastBookedService: params.payload
            }
          }
        case 'StoreAvailableTimeSlot':
          return {
            ...store,
            requestedServices:{
              ...store.requestedServices,
              avilableServiceSlot: params.payload
            }
          }
        case 'StoreOnBookingServiceStatus':
          return {
            ...store,
            requestedServices:{
              ...store.requestedServices,
              serviceBookedStatus: params.payload
            }
          }
        case 'StoreOnCancelServiceStatus':
          return {
            ...store,
            requestedServices:{
              ...store.requestedServices,
              onServiceCancelledStatus: params.payload
            }
          }
        default: return store;
    }
}
