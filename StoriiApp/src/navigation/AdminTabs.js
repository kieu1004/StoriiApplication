import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'

import AdminDashboardScreen from '../screens/adminScreen/AdminDashboardScreen'
import CategoryList from '../screens/adminScreen/CategoryListScreen'
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
            ),
            header:()=> null
          }
        }
      />

      <AdminTabs.Screen
        name="CategoryList"
        component={CategoryList}
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
            ),
            header:()=> null
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
            ),
            header:()=> null
          }
        }
      />

    </AdminTabs.Navigator>
  )
}