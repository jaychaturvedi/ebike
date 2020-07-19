import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Register
import RideOn from '../screens/ride/ride-on';
import RateRide from '../screens/ride/rate-ride'
import RideFeedback from '../screens/ride/ride-feedback'


/**
 * All props definiton goes here
 */
export type RideStackParamList = {
    RideOn: {},
    RateRide: {},
    RideFeedback: {}
}

const Ride = createStackNavigator<RideStackParamList>();

//Define all your stack here
export default function RideStack() {
    return (
        <Ride.Navigator screenOptions={{
            headerShown: false,
        }}
        // mode="modal"
        >
            <Ride.Screen name="RideOn" component={RideOn} />
            <Ride.Screen name="RateRide" component={RateRide} />
            <Ride.Screen name="RideFeedback" component={RideFeedback} />
        </Ride.Navigator>
    );
}  