import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import DrawerNavigator from './DrawerNavigator'
import ProviderMapScreen from '../screens/ProviderMapScreen'





const App = createStackNavigator();

export function AppStack() {

    return (
        <App.Navigator>
            
            <App.Screen
                name="App"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />


            <App.Screen
                name="ProviderMapScreen"
                component={ProviderMapScreen}
                options={{
                    headerShown: false,
                    ...TransitionPresets.RevealFromBottomAndroid
                }}
            />

        </App.Navigator>
    )
}