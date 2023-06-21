import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import SplashScreen from '../screens/authScreens/SplashScreen'
import SignInScreen from '../screens/authScreens/SignInScreen'
import SignUpScreen from '../screens/authScreens/SignUpScreen'
import AdminScreen from '../screens/AdminScreen'





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
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

            <Auth.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

        </Auth.Navigator>
    )
}