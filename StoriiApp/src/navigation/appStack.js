import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import ProviderMapScreen from '../screens/userScreen/ProviderMapScreen'
import DrawerNavigator from './DrawerNavigator'
import DetailsScreen from '../screens/userScreen/DetailsScreen'
import CartScreen from '../screens/userScreen/CartScreen'
import FilterCategory from '../screens/userScreen/FilterCategoryScreen'
import SearchResultScreen from '../screens/userScreen/SearchResultScreen'
import EditProfile from '../screens/userScreen/EditProfile'
import CheckOutScreen from '../screens/userScreen/CheckOutScreen'
import OrderSuccess from '../screens/userScreen/OrderSuccess'




const App = createStackNavigator()

export function AppStack() {

  return (
    <App.Navigator>
      <App.Screen
        name="App"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="ProviderMapScreen"
        component={ProviderMapScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="FilterCategory"
        component={FilterCategory}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="SearchResultScreen"
        component={SearchResultScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="CheckOutScreen"
        component={CheckOutScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

    </App.Navigator>
  )
}