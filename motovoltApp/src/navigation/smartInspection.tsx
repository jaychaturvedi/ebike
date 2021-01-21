import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SmartInspection from '../screens/smartInspection/inspection';
import SmartInspectionInProgress from '../screens/smartInspection/inspectionInProgress';
import SmartInspectionAbort from '../screens/smartInspection/inspectionAborted';
import SmartInspectionReport from '../screens/smartInspection/inspectionReport';
import SupportService from '../screens/menu/support-service';

/**
 * All props definiton goes here
 */
export type SmartInspectStackParamList = {
  SmartInspection:{};
  SmartInspectionInProgress:{},
  SmartInspectionAbort:{},
  SmartInspectionReport:{},
};

const SmartInspect = createStackNavigator<SmartInspectStackParamList>();

//Define all your stack here
export default function SmartInspectStack() {
  return (
    <SmartInspect.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <SmartInspect.Screen name="SmartInspection" component={SmartInspection} />
      <SmartInspect.Screen name="SmartInspectionInProgress" component={SmartInspectionInProgress} />
      <SmartInspect.Screen name="SmartInspectionAbort" component={SmartInspectionAbort} />
      <SmartInspect.Screen name="SmartInspectionReport" component={SmartInspectionReport} />
    </SmartInspect.Navigator>
  );
}
