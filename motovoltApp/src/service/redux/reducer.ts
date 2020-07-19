import Store, { TStore } from "./store";
import Action from "./actions";

export default (store: TStore = Store, params: Action): TStore => {
    console.log("Reecived", params, store)
    switch (params.type) {
        case "InitiateForgotPassword":
        case "InitiateMobileValidation":
        case "SignIn":
        case "SignUp":
        case "ValidateMobile":
        case "CompleteForgotPassword":
        case "ValidateFrame":
        //
        case "ReadBikeLocation":
        case "ReadNotifications":
        case "ReadBikeStat":
        //
        case "StartRide":
        case "EndRide":
        case "SubmitRide":
        //
        case "ReadRideData":
        case "ReadService":
        case "ReportIssue":
        case "SetBikeName":
        case "SetPersonalDetails":
        default: return store;
    }
}
