import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'

import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import AccountScreen from '../screens/AccountScreen';
import { ClientStack } from './clientStack';


const ClientTabs = createBottomTabNavigator();


export default function RootClientTabs() {

    return (
        <ClientTabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.buttons
            }}
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={
                    {
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='home'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />


            <ClientTabs.Screen
                name="SearchScreen"
                component={ClientStack}
                options={
                    {
                        tabBarLabel: "Search",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='search'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />



            <ClientTabs.Screen
                name="OrdersScreen"
                component={OrdersScreen}
                options={
                    {
                        tabBarLabel: "My Orders",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='view-list'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />



            <ClientTabs.Screen
                name="MyAccount"
                component={AccountScreen}
                options={
                    {
                        tabBarLabel: "My Account",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name='person'
                                type='material'
                                color={color}
                                size={size}
                            />
                        )
                    }
                }

            />
        </ClientTabs.Navigator>
    )
}