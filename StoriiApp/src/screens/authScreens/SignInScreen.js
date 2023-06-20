import React, { useState, useRef, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { Icon, Button, SocialIcon } from 'react-native-elements'
import { Formik } from "formik"
import *as Animatable from 'react-native-animatable'
import auth from '@react-native-firebase/auth'

import { colors, parameters, title } from "../../global/styles"
import Header from '../../components/Header'
import { SignInContext } from '../../contexts/authContext'
import { PrimaryButton, SecondaryButton } from "../../components/Button";






export default function SignInScreen({ navigation }) {

    const { dispatchSignedIn } = useContext(SignInContext)
    const [textInput2Fossued, setTextInput2Fossued] = useState(false)
    const textInpput1 = useRef(1)
    const textInput2 = useRef(2)




    async function signIn(data) {
        try {
            const { password, email } = data
            const user = await auth().signInWithEmailAndPassword(email, password)
            if (user) {
                dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
            }
        }
        catch (error) {
            Alert.alert(
                error.name,
                error.message
            )
        }

    }





    return (
        <View style={styles.container}>

            <Header type="arrow-left" navigation={navigation} />

            <View style={styles.details}>
                <View style={{ alignItems: 'center'}}>
                    <Image
                        style={{ width: "30%", resizeMode: 'contain' }}
                        source={require('../../assets/storii.png')}
                    />
                </View>


                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => {
                        signIn(values)

                    }}
                >
                    {(props) => (
                        <View>

                            <View style={{ marginTop: 20 }}>


                                <View>
                                    <TextInput
                                        style={styles.TextInput1}
                                        placeholder="Email"
                                        ref={textInpput1}
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                </View>


                                <View style={styles.TextInput2}>

                                    <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                        <Icon
                                            name="lock"
                                            iconStyle={{ color: colors.text_fuzz3 }}
                                            type="material"
                                            style={{}}
                                        />
                                    </Animatable.View>

                                    <TextInput
                                        style={{ flex: 1 }}
                                        placeholder="Password"
                                        ref={textInput2}
                                        onFocus={() => {
                                            setTextInput2Fossued(false)
                                        }}

                                        onBlur={() => {
                                            setTextInput2Fossued(true)
                                        }}
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                    />

                                    <Animatable.View animation={textInput2Fossued ? "" : "fadeInLeft"} duration={400} >
                                        <Icon
                                            name="visibility-off"
                                            iconStyle={{ color: colors.text_fuzz3 }}
                                            type="material"
                                            style={{ marginRight: 10 }}
                                        />
                                    </Animatable.View>

                                </View>

                            </View>

                            <View style={{ alignItems: "flex-end", marginTop: 10, marginRight: 20 }}>
                                <Text style={{ ...colors.text_fuzz3, textDecorationLine: "underline" }}
                                    onPress={() => { navigation.navigate("SignUpScreen") }}>Forgot Password ?</Text>
                            </View>


                            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                <PrimaryButton
                                    title="SIGN IN"
                                    onPress={props.handleSubmit}
                                />
                            </View>

                        </View>
                    )}
                </Formik>



                <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>OR</Text>
                </View>


                <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                    <SecondaryButton
                        title="SIGN UP"
                        onPress={() => { navigation.navigate("SignUpScreen") }}
                    />
                </View>



                <View style={{ alignItems: "flex-start", marginTop: 50, marginBottom: 5 }}>
                    <Text style={{ fontSize: 15 }}>Log in with social media</Text>
                </View>



                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    marginLeft: 60,
                    marginRight: 60
                }}>
                    <SocialIcon
                        type="facebook"
                        button
                        iconSize={20}
                        style={styles.SocialIcon}
                        onPress={() => { }}
                    />


                    <SocialIcon
                        type="google"
                        button
                        iconSize={20}
                        style={styles.SocialIcon}
                        onPress={() => { }}
                    />


                    <SocialIcon
                        type="twitter"
                        button
                        iconSize={20}
                        style={styles.SocialIcon}
                        onPress={() => { }}
                    />


                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    text1: {
        color: colors.text_white,
        fontSize: 12
    },

    TextInput1: {
        borderWidth: 1,
        borderColor: colors.text_fuzz3,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 15
    },

    TextInput2: {
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 20,
        borderColor: colors.text_fuzz3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 15
    },

    SocialIcon: {
        borderRadius: 30,
        height: 50,
        width: 50
    },

    details: {
        paddingHorizontal: 20,
        paddingBottom: "100%",
        backgroundColor: colors.banner_sale,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
})