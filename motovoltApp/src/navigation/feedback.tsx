import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import RateRide from '../screens/ride/rate-ride'
import RideFeedback from '../screens/ride/ride-feedback'


/**
 * All props definiton goes here
 */
export type FeedbackStackParamList = {
    RateRide: {},
    RideFeedback: {}
}

const Feedback = createStackNavigator<FeedbackStackParamList>();

//Define all your stack here
export default function RideStack() {
    return (
        <Feedback.Navigator screenOptions={{
            headerShown: false,
        }}
        // mode="modal"
        >
            <Feedback.Screen name="RateRide" component={RateRide} />
            <Feedback.Screen name="RideFeedback" component={RideFeedback} />
        </Feedback.Navigator>
    );
}  