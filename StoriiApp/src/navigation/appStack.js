import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import DrawerNavigator from './DrawerNavigator'
import ProviderMapScreen from '../screens/ProviderMapScreen'
import DetailsScreen from '../screens/DetailsScreen'






const AppStack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="App"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <AppStack.Screen
        name="ProviderMapScreen"
        component={ProviderMapScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <AppStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

    </AppStack.Navigator>
  )
}
