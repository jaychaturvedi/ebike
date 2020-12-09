import { NativeModules } from "react-native";

const mYellowMessengerModule = NativeModules.YellowMessengerModule;
if (mYellowMessengerModule)
    mYellowMessengerModule.initializeYM("ConnectM", "XYZ", "XYZ", "XYZ", "XYZ", "XYZ");
export { mYellowMessengerModule }

