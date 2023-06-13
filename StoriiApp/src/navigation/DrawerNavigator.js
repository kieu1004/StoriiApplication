import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements'

import RootClientTabs from './ClientTabs'
import {colors} from "../global/styles"




const Drawer = createDrawerNavigator()


export default function DrawerNavigator(){
    return(
        <Drawer.Navigator>

            <Drawer.Screen 
                name = "RootClientTabs"
                component ={RootClientTabs}

                options = {{
                    title:'Client',
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material-community"
                            name = "home"
                            color = {focussed ? '#7cc' :colors.primary_normal}
                            size = {size}

                        />
                    )
                }}
            />


        <Drawer.Screen 
                name = "Business consoleScreen"
                component ={BusinessConsoleScreen}

                options = {{
                    title:'Business console',
                    drawerIcon: ({focussed,size}) =>(
                        <Icon 
                            type = "material"
                            name = "business"
                            color = {focussed ? '#7cc' :colors.grey2}
                            size = {size}

                        />
                    )
                }}
            />

        </Drawer.Navigator>
    )

}