import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import AdminDashboardScreen from '../screens/adminScreen/AdminDashboardScreen';

const App = createStackNavigator();

export function AdminStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="AdminDashboardScreen"
        component={AdminDashboardScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </App.Navigator>
  );
}
