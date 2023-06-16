import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SearchScreen from '../screens/SearchScreen'
import MenuProductScreen from '../screens/MenuProductScreen'
import SearchResultScreen from '../screens/SearchResultScreen'
import ProviderHomeScreen from '../screens/ProviderHomeScreen'
import PreferenceScreen from '../screens/PreferenceScreen'





const ClientSearch = createStackNavigator()

export function ClientStack({ navigation, route }) {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "ProviderHomeScreen" || "MenuProductScreen") {
            navigation.setOptions({ tabBarVisible: false })
        } else {
            navigation.setOptions({ tabBarVisible: true })
        }
    }, [navigation, route])


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

            <ClientSearch.Screen
                name="MenuProductScreen"
                component={MenuProductScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />

            <ClientSearch.Screen
                name="PreferenceScreen"
                component={PreferenceScreen}
                options={
                    () => ({
                        headerShown: false
                    })
                }
            />


        </ClientSearch.Navigator>
    )
}