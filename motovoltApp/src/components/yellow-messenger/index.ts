import { NativeModules } from "react-native";

const mYellowMessengerModule = NativeModules.YellowMessengerModule;
if (mYellowMessengerModule)
    mYellowMessengerModule.initializeYM("x1607601182827", "XYZ", "XYZ", "XYZ", "XYZ", "XYZ");
export { mYellowMessengerModule }

