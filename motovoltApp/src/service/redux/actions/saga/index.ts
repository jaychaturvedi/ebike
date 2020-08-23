import {
    InitiateForgotPassword,
    InitiateMobileValidation,
    SignIn,
    SignUp,
    ValidateMobile,
    CompleteForgotPassword,
    ConfirmSignUp,
    ResendSignUp,
    SignOut
} from "./authentication-actions";
import {
    ReadBikeLocation,
    ReadBikeStat,
    ValidateFrame,
    UpdateBike,
} from "./bike-actions";
import {
    EndRide,
    ReadRideData,
    StartRide,
    SubmitRide,
    Speedometer
} from './rides';
import {
    ReadNotifications
} from "./notification-actions";
import {
    ReadService,
    ReportIssue
} from "./service-actions";
import {
    ConnectBLE,
    DisconnectBLE,
    ScanBLEDevices,
    TurnOnBLE,
} from "./ble";
import {
    ReadFAQ
} from './menu';

type Action = InitiateForgotPassword
    | InitiateMobileValidation
    | SignIn
    | SignUp
    | ValidateMobile
    | CompleteForgotPassword
    | ValidateFrame
    | UpdateBike
    | EndRide
    | ReadBikeLocation
    | ReadBikeStat
    | ReadRideData
    | StartRide
    | SubmitRide
    | ReadNotifications
    | ReadService
    | ReportIssue
    | ConnectBLE
    | DisconnectBLE
    | ScanBLEDevices
    | ReadFAQ
    | TurnOnBLE;


export default Action;

export type {
    InitiateForgotPassword,
    InitiateMobileValidation,
    SignIn,
    SignUp,
    ValidateMobile,
    CompleteForgotPassword,
    ValidateFrame,
    UpdateBike,
    EndRide,
    ReadBikeLocation,
    ReadBikeStat,
    ReadRideData,
    StartRide,
    SubmitRide,
    ReadNotifications,
    ReadService,
    ReportIssue,
    ConnectBLE,
    DisconnectBLE,
    ScanBLEDevices,
    TurnOnBLE,
    ReadFAQ,
    Speedometer,
} 