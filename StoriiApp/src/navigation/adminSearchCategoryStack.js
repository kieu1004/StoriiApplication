import React, { useLayoutEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import CategoryList from '../screens/adminScreen/CategoryListScreen'
import SearchCategoryResultScreen from '../screens/adminScreen/SearchCategoryResultScreen'
import CategoryDetail from '../screens/adminScreen/CategoryDetailScreen'





const AdminSearch = createStackNavigator()

export function AdminSearchCategoryStack({ navigation, route }) {

    return (
        <AdminSearch.Navigator>


            <AdminSearch.Screen
                name="Category"
                component={CategoryList}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <AdminSearch.Screen
                name="SearchResulCategory"
                component={SearchCategoryResultScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <AdminSearch.Screen
                name="Category Detail"
                component={CategoryDetail}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

        </AdminSearch.Navigator>
    )
}