import React, { useLayoutEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SearchScreen from '../screens/userScreen/SearchScreen'
import SearchResultScreen from '../screens/userScreen/SearchResultScreen'
import DetailsScreen from '../screens/userScreen/DetailsScreen'





const ClientSearch = createStackNavigator()

export function ClientStack({ navigation, route }) {

    return (
        <ClientSearch.Navigator>


            <ClientSearch.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <ClientSearch.Screen
                name="SearchResultScreen"
                component={SearchResultScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

        </ClientSearch.Navigator>
    )
}