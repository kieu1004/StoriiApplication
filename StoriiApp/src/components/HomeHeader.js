import React from "react"

import {View, Text, StyleSheet} from 'react-native'
import {Icon, withBadge} from 'react-native-elements'
import {colors, parameters} from '../global/styles'

export default function HomeHeader(){

    const BadgeIcon = withBadge(0)(Icon)
    return(
        <View style={styles.header}>
            <View style={{alignItems:"center", justifyContent:"center", marginLeft:15}}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.primary_normal}
                    size={32}
                />
            </View>

            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text style={{color:colors.primary_normal, fontSize:25, fontWeight:'bold'}}>XpressProduct</Text>
            </View>

            <View style={{alignItems:"center", justifyContent:"center", marginRight:15}}>
                <BadgeIcon
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.primary_light}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header :{
        flexDirection:"row",
        backgroundColor: colors.primary_bold,
        height: parameters.headerHeight,
        justifyContent:"space-between"
    }
})