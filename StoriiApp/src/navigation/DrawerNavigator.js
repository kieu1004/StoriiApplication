import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'

import { colors, parameters } from "../global/styles"
import RootClientTabs from './ClientTabs';
import BusinessConsoleScreen from '../screens/userScreen/BusinessConsoleScreen';
import DrawerContent from '../components/DrawerContent';





const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >


            <Drawer.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    title: 'Client',
                    drawerIcon: ({ focussed, size }) => (
                        <Icon
                            type="material-community"
                            name="home"
                            color={focussed ? '#7cc' : colors.primary_normal}
                            size={size}
                        />
                    ),
                    header:()=> null
                }}
            />

        </Drawer.Navigator>
    )

}