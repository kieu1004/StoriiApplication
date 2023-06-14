import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SearchScreen from '../screens/SearchScreen'
import SearchResultScreen from '../screens/SearchResultScreen'
import ProviderHomeScreen from '../screens/ProviderHomeScreen'



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

            <ClientSearch.Screen
                name="ProviderHomeScreen"
                component={ProviderHomeScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />
        </ClientSearch.Navigator>
    )
}