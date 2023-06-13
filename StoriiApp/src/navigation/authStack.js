import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import SplashScreen from '../screens/authScreens/SplashScreen'
import SignInScreen from '../screens/authScreens/SignInScreen'
import RootClientTabs from './ClientTabs'
import ProviderMapScreen from '../screens/ProviderMapScreen'


const Auth = createStackNavigator();

export function AuthStack() {
    return (
        <Auth.Navigator>
            <Auth.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen
                name="ProviderMapScreen"
                component={ProviderMapScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
        </Auth.Navigator>
    )
}