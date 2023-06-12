import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, parameters } from '../global/styles'
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen() {

    const [delivery, setDelivery] = useState(true)
    return (
        <View style={styles.container}>
            <HomeHeader />

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}>

                <View style={{ marginTop: 10, flexDirection: "row", justifyContent:"space-evenly"}}>
                    <TouchableOpacity
                        onPress={() => {
                            setDelivery(true)
                        }}>
                        <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.primary_bold : colors.primary_light }}>
                            <Text style={styles.deliveryText}>Delivery</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setDelivery(false)
                        }}>
                        <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.primary_normal : colors.primary_light }}>
                            <Text style={styles.deliveryText}>Pick Up</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.filterView}>
                    <View style={styles.addressView}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                            <Icon
                                type="material-community"
                                name="map-marker"
                                color={colors.primary_bold}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>86 Au Co</Text>
                        </View>

                        <View style={styles.clockView}>
                            <Icon
                                type="material-community"
                                name="clock-time-four"
                                color={colors.primary_bold}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>Now</Text>
                        </View>
                    </View>

                    <View>
                        <Icon
                            type="material-community"
                            name="tune"
                            color={colors.primary_bold}
                            size={26}
                        />
                    </View>

                </View>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Categories</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5
    },

    deliveryText: {
        marginLeft: 5,
        fontSize: 16,
    },

    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 10
    },

    addressView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.primary_light,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 3
    },

    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: colors.primary_light,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginRight: 20
    },

    headerText :{
        color:colors.primary_bold,
        fontSize:24,
        fontWeight:"bold",
        paddingLeft:10
    },

    headerTextView :{
        backgroundColor:colors.primary_light,
        paddingVertical:2,
    }
})