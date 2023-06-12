import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { View } from "react-native-animatable";
import SplashScreen from "../screens/authScreens/SplashScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";

const Auth = createStackNavigator();

export default function AuthStack() {
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
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />
        </Auth.Navigator>
    )
}
