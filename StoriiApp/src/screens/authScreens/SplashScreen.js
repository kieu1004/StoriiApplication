import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth'
import Swiper from 'react-native-swiper'
import { Icon, Button, SocialIcon } from 'react-native-elements'
import { colors, parameters, title } from "../../global/styles"

import { SignInContext } from '../../contexts/authContext'





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
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }} >


            <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>DISCOVER RESTAURANTS</Text>
                <Text style={{ fontSize: 26, color: colors.buttons, fontWeight: 'bold' }}>IN YOUR AREA</Text>
            </View>


            <View style={{}}>

                <Swiper autoplay={true} style={{ height: 250, }}>
                    <View style={styles.slide1}>
                        <Image
                            source={{ uri: "https://bukasapics.s3.us-east-2.amazonaws.com/plate4.png" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide2}>
                        <Image
                            source={{ uri: "https://bukasapics.s3.us-east-2.amazonaws.com/plate3.png" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>


                    <View style={styles.slide3}>
                        <Image
                            source={{ uri: "https://bukasapics.s3.us-east-2.amazonaws.com/plate5.png" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                    <View style={styles.slide3}>
                        <Image
                            source={{ uri: "https://bukasapics.s3.us-east-2.amazonaws.com/plate1.png" }}
                            style={{ height: "100%", width: "100%" }}
                        />
                    </View>

                </Swiper>
            </View>


            <View style={{ marginBottom: 20 }}>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Button
                        title="SIGN IN"
                        buttonStyle={parameters.styledButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={() => {
                            navigation.navigate("SignInScreen")
                        }}
                    />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Button
                        title="Create an account"
                        buttonStyle={styles.createButton}
                        titleStyle={styles.createButtonTitle}
                        onPress={() => { navigation.navigate("SignUpScreen") }}
                    />
                </View>

            </View>


        </ScrollView>
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

    createButton: {
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
    createButtonTitle: {
        color: colors.primary_normal,
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }
})