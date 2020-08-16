import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Register
import HomeScreen from '../screens/home/index';
import GPS from '../screens/home/gps-lui'


/**
 * All props definiton goes here
 */
export type HomeStackParamList = {
    Home: {},
    Gps: {}
}

const Home = createStackNavigator<HomeStackParamList>();

//Define all your stack here
export default function HomeStack() {
    return (
        <Home.Navigator screenOptions={{
            headerShown: false,
            animationEnabled: false,
        }}
        // mode="modal"
        >
            <Home.Screen name="Home" component={HomeScreen} />
            <Home.Screen name="Gps" component={GPS} />
        </Home.Navigator>
    );
}  