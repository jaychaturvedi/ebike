import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../screens/menu/more-menu';
import Profile from '../screens/menu/profile'
import Upgrade from '../screens/menu/upgrade'
import Support from '../screens/menu/support'
import SupportService from '../screens/menu/support-service'
import ReportIssue from '../screens/menu/report-issue'
import ServiceDetails from '../screens/menu/serviceDetails'

/**
 * All props definiton goes here
 */
export type MenuStackParamList = {
    MenuScreen: {},
    Profile: {},
    Upgrade: {},
    Support: {},
    SupportService: {},
    ReportIssue: {},
    ServiceDetails: {}
}

const Menu = createStackNavigator<MenuStackParamList>();

//Define all your stack here
export default function MenuStack() {
    return (
        <Menu.Navigator screenOptions={{
            headerShown: false,
        }}
        // mode="modal"
        >
            <Menu.Screen name="MenuScreen" component={MenuScreen} />
            <Menu.Screen name="Profile" component={Profile} />
            <Menu.Screen name="Upgrade" component={Upgrade} />
            <Menu.Screen name="Support" component={Support} />
            <Menu.Screen name="SupportService" component={SupportService} />
            <Menu.Screen name="ServiceDetails" component={ServiceDetails} />
            <Menu.Screen name="ReportIssue" component={ReportIssue} />
        </Menu.Navigator>
    );
}  