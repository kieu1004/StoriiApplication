import React, { useLayoutEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import SearchScreen from '../screens/SearchScreen'
import SearchResultScreen from '../screens/SearchResultScreen'
import DetailsScreen from '../screens/DetailsScreen'





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
                name="DetailsScreen"
                component={DetailsScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />


        </ClientSearch.Navigator>
    )
}