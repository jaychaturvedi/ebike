import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerServices from '../screens/customerService/customer-service';
import BookServiceLanding from '../screens/customerService/book-a-service/book-service';
import RoadAssistanceLanding from '../screens/customerService/roadsideAssistance/search-assistance';
import NearByAssistance from '../screens/customerService/roadsideAssistance/nearby-assistance';
import TrackAssistance from '../screens/customerService/roadsideAssistance/track-assistance';
import BookNewService from '../screens/customerService/book-a-service/new-service';
import NewIssue from '../screens/customerService/report-issue/new-issue';
import ReportAnIssue from '../screens/customerService/report-issue/report-an-issue';
import ReportedIssueConversation from '../screens/customerService/report-issue/active-issues-chat';
import ActiveIssueImages from '../screens/customerService/report-issue/image-viewer';
import * as ImagePicker from 'react-native-image-picker';

export type CustomerServiceStackParamList = {
  CustomerServices: {};

  ReportAnIssue: {};
  NewIssue: {};
  ReportedIssueConversation: {
    screenName: string,
    issue: {
      issueId: number,
      createdTime: string,
      categoryName: string,
      issueDescription: string,
    }
  };
  ActiveIssueImages: {
    photo: ImagePicker.ImagePickerResponse[]
  };

  RoadAssistanceLanding: {};
  NearByAssistance: {};
  TrackAssistance: {};

  BookAService: {};
  BookNewService: {};

  SupportService: {};
};

const CustomerService = createStackNavigator<CustomerServiceStackParamList>();

//Define all your stack here
export default function CustomerServiceStack() {
  return (
    <CustomerService.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <CustomerService.Screen
        name="CustomerServices"
        component={CustomerServices}
      />
      <CustomerService.Screen
        name="RoadAssistanceLanding"
        component={RoadAssistanceLanding}
      />
      <CustomerService.Screen
        name="NearByAssistance"
        component={NearByAssistance}
      />
      <CustomerService.Screen
        name="TrackAssistance"
        component={TrackAssistance}
      />
      <CustomerService.Screen
        name="ReportAnIssue"
        component={ReportAnIssue} />
      <CustomerService.Screen
        name="NewIssue"
        component={NewIssue} />
      <CustomerService.Screen
        name="ReportedIssueConversation"
        component={ReportedIssueConversation} />
      <CustomerService.Screen
        name="ActiveIssueImages"
        component={ActiveIssueImages} />

      <CustomerService.Screen
        name="BookAService"
        component={BookServiceLanding}
      />
      <CustomerService.Screen
        name="BookNewService"
        component={BookNewService}
      />
    </CustomerService.Navigator>
  );
}
