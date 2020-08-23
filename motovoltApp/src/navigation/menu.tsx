import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../screens/menu/more-menu';
import Profile from '../screens/menu/profile'
import Upgrade from '../screens/menu/upgrade'
import Support from '../screens/menu/support'
import SupportService from '../screens/menu/support-service'
import ReportIssue from '../screens/menu/report-issue'
import ServiceDetails from '../screens/menu/serviceDetails'
import FAQPremium from '../screens/menu/faq-premium';
import FAQ from '../screens/menu/faq';
import ComingSoon from '../screens/common/coming-soon';

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
    ServiceDetails: {
        serviceId: string
    },
    Faq: {},
    FaqPremium: {
        header: string,
        faq: {
            Question: string,
            Answer: string
        }[]
    },
    ComingSoon: {}
}

const Menu = createStackNavigator<MenuStackParamList>();

//Define all your stack here
export default function MenuStack() {
    return (
        <Menu.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
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
            <Menu.Screen name="Faq" component={FAQ} />
            <Menu.Screen name="FaqPremium" component={FAQPremium} />
            <Menu.Screen name="ComingSoon" component={ComingSoon} />
        </Menu.Navigator>
    );
}  