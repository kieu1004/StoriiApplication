import React, { useLayoutEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import FoodList from '../screens/adminScreen/FoodListScreen'
import SearchResulFoodtScreen from '../screens/adminScreen/SearchFoodResultScreen'
import FoodDetail from '../screens/adminScreen/FoodDetailScreen'





const AdminSearch = createStackNavigator()

export function AdminSearchStack({ navigation, route }) {

    return (
        <AdminSearch.Navigator>


            <AdminSearch.Screen
                name="Food"
                component={FoodList}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <AdminSearch.Screen
                name="SearchResulFoodtScreen"
                component={SearchResulFoodtScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <AdminSearch.Screen
                name="Food Detail"
                component={FoodDetail}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

        </AdminSearch.Navigator>
    )
}