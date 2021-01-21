import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerServices from '../screens/customerService/customer-service';
import RoadsideAssistance from '../screens/customerService/roadsideAssistance/search-assistance';

export type CustomerServiceStackParamList = {
  CustomerServices:{};
  ReportAnIssue:{};
  RequestAService:{};
  RoadsideAssistance:{};
};

const CustomerService = createStackNavigator<CustomerServiceStackParamList>();

//Define all your stack here
export default function CustomerServiceStack() {
  return (
    <CustomerService.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <CustomerService.Screen name="CustomerServices" component={CustomerServices} />
      <CustomerService.Screen name="RoadsideAssistance" component={RoadsideAssistance} />
    </CustomerService.Navigator>
  );
}
