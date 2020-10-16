import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Register
import MyRides from '../screens/statistics/my-rides';
import IndividualRide from '../screens/statistics/individual-ride'


/**
 * All props definiton goes here
 */
export type StatisticsStackParamList = {
    MyRides: {},
    IndividualRide: {}
}

const Statistics = createStackNavigator<StatisticsStackParamList>();

//Define all your stack here
export default function StatisticsStack() {
    return (
        <Statistics.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
        }}
        // mode="modal"
        >
            <Statistics.Screen name="MyRides" component={MyRides} />
            <Statistics.Screen name="IndividualRide" component={IndividualRide} />
        </Statistics.Navigator>
    );
}  