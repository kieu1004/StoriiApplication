import React from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Icon} from 'react-native-elements'
import { colors, parameters } from '../global/styles'





export default function HomeHeader({ navigation }) {


    return (
        <View style={styles.header}>

            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 15 }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.background}
                    size={32}
                    onPress={() => {
                        navigation.toggleDrawer()
                    }}
                />
            </View>


            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: colors.primary_normal, fontSize: 25, fontWeight: 'bold' }}>STORII</Text>
            </View>


            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <Icon
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.background}
                    onPress={() => navigation.navigate('CartScreen')}
                />
            </View>

        </View>
    )
}





const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.primary_bold,
        height: parameters.headerHeight,
        justifyContent: "space-between"
    }
})