import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SmartInspection from '../screens/smartInspection/inspection';
import SmartInspectionInProgress from '../screens/smartInspection/inspectionInProgress';
import SmartInspectionAbort from '../screens/smartInspection/inspectionAborted';
import AbortInProgress from '../screens/smartInspection/abortInProgress';
import AbortIsAborted from '../screens/smartInspection/abortIsAborted';
import SmartInspectionReport from '../screens/smartInspection/inspectionReport';
import SupportService from '../screens/menu/support-service';
import { TSmartInspectReport } from 'src/service/redux/store';
import ReportAnIssue from '../screens/customerService/report-issue/report-an-issue';
import { ParamListBase } from '@react-navigation/native';
import CustomerServiceStack, { CustomerServiceStackParamList } from './customer-service';

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K] }
}[keyof T]
/**
 * All props definiton goes here
 */
export type SmartInspectStackParamList = {
  SmartInspection:{};
  SmartInspectionInProgress:{},
  SmartInspectionAbort:{},
  AbortInProgress:{},
  AbortIsAborted:{},
  SmartInspectionReport:{
    data: TSmartInspectReport
  },
  CustomerService:SubNavigator<CustomerServiceStackParamList>,
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
      <SmartInspect.Screen name="AbortInProgress" component={AbortInProgress} />
      <SmartInspect.Screen name="AbortIsAborted" component={AbortIsAborted} />
      <SmartInspect.Screen name="SmartInspectionReport" component={SmartInspectionReport} />
      <SmartInspect.Screen name="CustomerService" component={CustomerServiceStack} />
    </SmartInspect.Navigator>
  );
}
