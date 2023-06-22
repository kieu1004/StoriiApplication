import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import AdminDashboardScreen from '../screens/adminScreen/AdminDashboardScreen'
import EditUserScreen from '../screens/adminScreen/EditInfoScreen'

const App = createStackNavigator()

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

      <App.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

    </App.Navigator>
  );
}
