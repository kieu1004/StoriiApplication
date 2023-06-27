import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'

import AdminDashboardScreen from '../screens/adminScreen/AdminDashboardScreen'
import ManageCategory from '../screens/adminScreen/ManageCategogy'
import FoodList from '../screens/adminScreen/FoodListScreen'






const AdminTabs = createBottomTabNavigator()

export default function RootAdminTabs() {
  return (
    <AdminTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.buttons,
      }}
    >

      <AdminTabs.Screen
        name="AdminDashboardScreen"
        component={AdminDashboardScreen}
        options={
          {
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name='home'
                type='material'
                color={color}
                size={size}
              />
            )
          }
        }
      />

      <AdminTabs.Screen
        name="ManageCategory"
        component={ManageCategory}
        options={
          {
            tabBarLabel: "Category",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name='category'
                type='material'
                color={color}
                size={size}
              />
            )
          }
        }
      />

      <AdminTabs.Screen
        name="FoodList"
        component={FoodList}
        options={
          {
            tabBarLabel: "Product",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name='inventory'
                type='material'
                color={color}
                size={size}
              />
            )
          }
        }
      />

    </AdminTabs.Navigator>
  )
}