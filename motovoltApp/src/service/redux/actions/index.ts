import {
    InitiateForgotPassword,
    InitiateMobileValidation,
    SignIn,
    SignUp,
    ValidateMobile,
    CompleteForgotPassword
} from "./authentication-actions";
import {
    ValidateFrame,
    SetBikeName,
    SetPersonalDetails
} from "./onboarding-actions";
import {
    EndRide,
    ReadBikeLocation,
    ReadBikeStat,
    ReadRideData,
    StartRide,
    SubmitRide
} from "./bike-actions";
import {
    ReadNotifications
} from "./notification-actions";
import {
    ReadService,
    ReportIssue
} from "./service-actions";

type Action = InitiateForgotPassword
    | InitiateMobileValidation
    | SignIn
    | SignUp
    | ValidateMobile
    | CompleteForgotPassword
    | ValidateFrame
    | SetBikeName
    | SetPersonalDetails
    | EndRide
    | ReadBikeLocation
    | ReadBikeStat
    | ReadRideData
    | StartRide
    | SubmitRide
    | ReadNotifications
    | ReadService
    | ReportIssue;

export default Action;

export type {
    InitiateForgotPassword,
    InitiateMobileValidation,
    SignIn,
    SignUp,
    ValidateMobile,
    CompleteForgotPassword,
    ValidateFrame,
    SetBikeName,
    SetPersonalDetails,
    EndRide,
    ReadBikeLocation,
    ReadBikeStat,
    ReadRideData,
    StartRide,
    SubmitRide,
    ReadNotifications,
    ReadService,
    ReportIssue
} 