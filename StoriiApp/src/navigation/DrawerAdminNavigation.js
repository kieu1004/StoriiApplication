import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'

import { colors, parameters } from "../global/styles"
import RootAdminTabs from './AdminTabs'
import DrawerAdminContent from '../components/DrawerAdminContent'





const Drawer = createDrawerNavigator()

export default function DrawerAdminNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerAdminContent {...props} />}
        >

            <Drawer.Screen
                name="RootAdminTabs"
                component={RootAdminTabs}
                options={{
                    title: 'Admin',
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