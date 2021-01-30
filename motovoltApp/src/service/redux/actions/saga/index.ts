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
    ReadFAQ,
    ReadUpgrades
} from './menu';
import {
    BeginSmartInspection
} from './smartInspect-actions';

import {
  SwitchEnvironment
} from './profile';

import {
  GetNearbyServiceProviders,
  GetBookingTimeSlot,
  GetPastIssuesList,
  OnBookingService,
  OnCancelService,
  GetBookedServices
} from './book-a-service';

import {GetRoadSideAssitance } from "./roadside-actions"

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
    | ReadUpgrades
    | BeginSmartInspection
    | TurnOnBLE
    | SwitchEnvironment
    | GetNearbyServiceProviders
    | GetBookingTimeSlot
    | GetPastIssuesList
    | OnBookingService
    | GetBookedServices
    | OnCancelService
    | GetRoadSideAssitance;


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
    ReadUpgrades,
    Speedometer,
    BeginSmartInspection,
    SwitchEnvironment,
    GetNearbyServiceProviders,
    GetBookingTimeSlot,
    GetPastIssuesList,
    OnBookingService,
    GetBookedServices,
    OnCancelService,
    GetRoadSideAssitance
} 