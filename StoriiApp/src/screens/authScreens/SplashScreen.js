import React, { useState, useRef } from "react";

import { View, Text, StyleSheet, Dimensions, TextInput, Image } from 'react-native'
import { colors, parameters } from "../../global/styles"

import { Icon, Button, SocialIcon } from 'react-native-elements'
import Header from '../../components/Header'
import *as Animatable from 'react-native-animatable'

import Swiper from "react-native-swiper";

export default function SplashScreen(navigation) {
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ fontSize: 26, color: colors.primary_bold, fontWeight: ']bold' }}>DISCOVERY STORII</Text>
                <Text style={{ fontSize: 26, color: colors.primary_bold, fontWeight: ']bold' }}>IN YOUR AREA</Text>
            </View>

            <View style={{ flex: 4, justifyContent: 'center' }}>
                <Swiper autoplay={true}>
                    <View style={styles.slide1}>
                        <Image
                            source={{ uri: "https://api.storii.vn/staticfiles/2021_12_25_StoNote.png" }}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={{ uri: "https://api.storii.vn/staticfiles/Workshop-01.png" }}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image
                            source={{ uri: "https://api.storii.vn/staticfiles/2021_12_25_StoShop.png" }}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </View>
                </Swiper>
            </View>

            <View style={{ flex:4, justifyContent:'flex-end', marginBottom:20}}>
                <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
                    <Button
                        title="SIGN IN"
                        buttonStyle={parameters.styleButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={()=>{
                            navigation.navigate("SignInScreen")
                        }}
                    />
                </View>

                <View style={{marginHorizontal:20, marginTop:10}}>
                    <Button
                        title="Create an account"
                        buttonStyle = {styles.createButton}
                        titleStyle = {styles.createButtonTitle}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9dd6eb'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97cae5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92bb09'
    },

    createButton :{
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary_bold,
        height: 50,
        paddingHorizontal: 20,
        borderColor: colors.primary_normal
    },
    createButtonTitle :{
        color: colors.primary_normal,
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }
})