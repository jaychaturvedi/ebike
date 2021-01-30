import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerServices from '../screens/customerService/customer-service';
import BookServiceLanding from '../screens/customerService/book-a-service/book-service';
import RoadAssistanceLanding from '../screens/customerService/roadsideAssistance/search-assistance';
import NearByAssistance from '../screens/customerService/roadsideAssistance/nearby-assistance';
import TrackAssistance from '../screens/customerService/roadsideAssistance/track-assistance';
import BookNewService from '../screens/customerService/book-a-service/new-service';

export type CustomerServiceStackParamList = {
  CustomerServices:{};

  ReportAnIssue:{};

  RoadAssistnceLanding:{};
  NearByAssistance:{};
  TrackAssistance:{};
  
  BookAService:{};
  BookNewService:{}
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
      <CustomerService.Screen name="RoadAssistnceLanding" component={RoadAssistanceLanding} />
      <CustomerService.Screen name="NearByAssistance" component={NearByAssistance} />
      <CustomerService.Screen name="TrackAssistance" component={TrackAssistance} />
      {/* <CustomerService.Screen name="ReportAnIssue" component={BookServiceLanding} /> */}
      <CustomerService.Screen name="BookAService" component={BookServiceLanding} />
      <CustomerService.Screen name="BookNewService" component={BookNewService} />
    </CustomerService.Navigator>
  );
}
