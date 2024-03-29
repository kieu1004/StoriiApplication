import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth'
import Swiper from 'react-native-swiper'
import { Icon, Button, SocialIcon } from 'react-native-elements'
import { colors, parameters, title } from "../../global/styles"

import { SignInContext } from '../../contexts/authContext'
import { PrimaryButton, SecondaryButton } from '../../components/Button';





export default function SplashScreen({ navigation }) {
    const { dispatchSignedIn } = useContext(SignInContext)

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
            } else {
                dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
            }
        })

    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.banner_sale }}>
            <View>
                <Image
                    style={{
                        width: '100%',
                        resizeMode: 'contain',
                    }}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                        Delicious Food
                    </Text>
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 15,
                            textAlign: 'center',
                            color: colors.text_fuzz3,
                        }}>
                        We help you to find best and delicious food
                    </Text>
                </View>
                <View style={styles.indicatorContainer}>
                    <View style={styles.currentIndicator} />
                    <View style={styles.indicator} />
                    <View style={styles.indicator} />
                </View>

                <View style={{marginTop:30}}>
                    <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                        <PrimaryButton
                            title="SIGN IN"
                            onPress={() => {
                                navigation.navigate("SignInScreen")
                            }}
                        />
                    </View>


                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <SecondaryButton
                            title="Create an account"
                            onPress={() => { navigation.navigate("SignUpScreen") }}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}





const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 20,
        top: -30
    },

    indicatorContainer: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    currentIndicator: {
        height: 12,
        width: 30,
        borderRadius: 10,
        backgroundColor: colors.primary_normal,
        marginHorizontal: 5,
    },

    indicator: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.text_fuzz3,
        marginHorizontal: 5,
    }
})