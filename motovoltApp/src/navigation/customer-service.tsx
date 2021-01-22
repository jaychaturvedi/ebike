import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerServices from '../screens/customerService/customer-service';
import RoadAssistnceLanding from '../screens/customerService/roadsideAssistance/search-assistance';
import NearByAssistance from '../screens/customerService/roadsideAssistance/nearby-assistance';
import TrackAssistance from '../screens/customerService/roadsideAssistance/track-assistance';

export type CustomerServiceStackParamList = {
  CustomerServices:{};
  ReportAnIssue:{};
  RequestAService:{};
  RoadAssistnceLanding:{};
  NearByAssistance:{};
  TrackAssistance:{};
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
      <CustomerService.Screen name="RoadAssistnceLanding" component={RoadAssistnceLanding} />
      <CustomerService.Screen name="NearByAssistance" component={NearByAssistance} />
      <CustomerService.Screen name="TrackAssistance" component={TrackAssistance} />
    </CustomerService.Navigator>
  );
}
