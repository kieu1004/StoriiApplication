import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import EditUserScreen from '../screens/adminScreen/EditInfoScreen'
import FoodForm from '../components/FoodForm'
import CategoryDetail from '../screens/adminScreen/CategoryDetailScreen'
import CategoryForm from '../components/CategoryForm'
import RootAdminTabs from './AdminTabs'
import DrawerAdminNavigator from './DrawerAdminNavigation'
import FoodDetail from '../screens/adminScreen/FoodDetailScreen'
import SearchResulFoodtScreen from '../screens/adminScreen/SearchFoodResultScreen'







const App = createStackNavigator()

export function AdminStack() {
  return (
    <App.Navigator>
      <App.Screen
        name="Admin Dashboard"
        component={DrawerAdminNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      {/* Edit user */}
      <App.Screen
        name="Edit User"
        component={EditUserScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      {/* Add */}
      <App.Screen
        name="Food Form"
        component={FoodForm}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="Category Form"
        component={CategoryForm}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />


      {/* Detail */}
      <App.Screen
        name="Category Detail"
        component={CategoryDetail}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      <App.Screen
        name="Food Detail"
        component={FoodDetail}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />

      {/* Bottom nav */}
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