import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

//Register
import HomeScreen from '../screens/home/index';


/**
 * All props definiton goes here
 */
export type HomeStackParamList = {
    Home: {}
}

const Home = createStackNavigator<HomeStackParamList>();

//Define all your stack here
export default function HomeStack() {
    return (
        <Home.Navigator screenOptions={{
            headerShown: false,
        }}
        // mode="modal"
        >
            <Home.Screen name="Home" component={HomeScreen} />
        </Home.Navigator>
    );
}  