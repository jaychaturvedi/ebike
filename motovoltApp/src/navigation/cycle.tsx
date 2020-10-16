import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyCycleScreen from '../screens/cycle/my-cycle';

/**
 * All props definiton goes here
 */
export type MyCycleStackParamList = {
  MyCycleScreen: {};
};

const MyCycle = createStackNavigator<MyCycleStackParamList>();

//Define all your stack here
export default function CycleStack() {
  return (
    <MyCycle.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      // mode="modal"
    >
      <MyCycle.Screen name="MyCycleScreen" component={MyCycleScreen} />
    </MyCycle.Navigator>
  );
}
