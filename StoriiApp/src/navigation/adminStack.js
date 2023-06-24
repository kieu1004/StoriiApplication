import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import EditUserScreen from '../screens/adminScreen/EditInfoScreen'
import RootAdminTabs from './AdminTabs'
import DrawerAdminNavigator from './DrawerAdminNavigation'






const App = createStackNavigator()

export function AdminStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="AdminDashboardScreen"
        component={DrawerAdminNavigator}
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

      <App.Screen
        name="RootAdminTabs"
        component={RootAdminTabs}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

    </App.Navigator>
  );
}