import React , {useState}from "react";

import{View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {colors, parameters } from '../global/styles'
import HomeHeader from "../components/HomeHeader";

export default function HomeScreen(){

    const [delivery, setDelivery] = useState(true)
    return (
        <View style={styles.container}>
            <HomeHeader/>

            <View style={{marginTop:10, flexDirection:"row", justifyContent:"space-evenly"}}>
                <TouchableOpacity>
                    <View style={{...styles.deliveryButton, backgroundColor:delivery?colors.primary_bold:colors.primary_light}}>
                        <Text style={styles.deliveryText}>Delivery</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={{...styles.deliveryButton, backgroundColor:delivery?colors.primary_normal:colors.primary_light}}>
                        <Text style={styles.deliveryText}>Pick Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1
    },

    deliveryButton :{
        paddingHorizontal:20,
        borderRadius:15,
        paddingVertical:5
    },

    deliveryText :{
        marginLeft:5,
        fontSize:16,
    }
})