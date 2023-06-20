import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from 'react-native'
import { Formik } from 'formik'
import { Icon, Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import auth from '@react-native-firebase/auth'
import { tSIndexSignature } from '@babel/types'

import { colors } from '../../global/styles'
import Header from '../../components/Header'
import { PrimaryButton, SecondaryButton } from '../../components/Button'





const initialValues = { phone_number: '', name: "", family_name: "", password: "", email: '', username: '' }

const SignUpScreen = ({ navigation }) => {


    const [passwordFocussed, setPassordFocussed] = useState(false)
    const [passwordBlured, setPasswordBlured] = useState(false)


    async function signUp(values) {
        const { email, password } = values

        try {
            await auth().createUserWithEmailAndPassword(email, password)
            console.log("USER ACCOUNT CREATED")
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert(
                    'That email address is already inuse'
                )
            }
            if (error.code === 'auth/invalid-email') {
                Alert.alert(
                    'That email address is invalid'
                )
            }
            else {
                Alert.alert(error.code)
            }
        }
    }





    return (
        <View style={styles.container}>

            <Header type="arrow-left" navigation={navigation} />

            <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>


                <View style={styles.view1}>
                    <Text style={styles.text1}>SIGN UP</Text>
                </View>


                <Formik initialValues={initialValues} onSubmit={(values) => { signUp(values) }}>
                    {(props) => (
                        <View style={styles.view2}>

                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={styles.text2}>New on STORII ?</Text>
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Mobile Number"
                                    style={styles.input1}
                                    keyboardType="number-pad"
                                    autoFocus={true}
                                    onChangeText={props.handleChange('phone_number')}
                                    value={props.values.phone_number}
                                />
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Name"
                                    style={styles.input1}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                />
                            </View>

                            <View style={styles.view6}>
                                <TextInput
                                    placeholder="Family name"
                                    style={styles.input1}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('family_name')}
                                    value={props.values.family_name}
                                />
                            </View>

                            <View style={styles.view10}>
                                <View>
                                    <Icon
                                        name='email'
                                        style={styles.email}
                                        color={colors.text_fuzz3}
                                        type="material"
                                    />
                                </View>
                                <View style={styles.view11}>
                                    <TextInput
                                        placeholder="Email"
                                        style={styles.input4}
                                        autoFocus={false}
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                    />
                                </View>
                            </View>

                            <View style={styles.view14}>
                                <Animatable.View animation={passwordFocussed ? "fadeInRight" : "fadeInLeft"} duration={400}>
                                    <Icon name="lock" color={colors.text_fuzz3} type="material" />
                                </Animatable.View>
                                <TextInput
                                    placeholder="Password"
                                    style={{ flex: 1 }}
                                    autoFocus={false}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onFocus={() => { setPassordFocussed(true) }}
                                    onBlur={() => { setPasswordBlured(true) }}
                                />
                                <Animatable.View animation={passwordBlured ? "fadeInLeft" : "fadeInRight"} duration={400}>
                                    <Icon name="visibility-off" color={colors.text_fuzz3} type="material" style={{ marginRight: 10 }} />
                                </Animatable.View>
                            </View>

                            <View style={styles.view15}>
                                <Text style={styles.text3}>By creating or logging into an account you are</Text>
                                <View style={styles.view16}>
                                    <Text style={styles.text3}>agreeing with our  </Text>
                                    <Text style={styles.text4}> Terms & Conditions</Text>
                                    <Text style={styles.text3}> and </Text>
                                </View>
                                <Text style={styles.text4}> Privacy Statement</Text>
                            </View>

                            <View style={styles.view17}>
                                <PrimaryButton
                                    title="Create my account"
                                    onPress={props.handleSubmit}
                                />
                            </View>


                        </View>

                    )}
                </Formik>


                <View style={styles.view18}>
                    <Text style={styles.text5}>OR</Text>
                </View>
                <View style={styles.view21}>
                    <SecondaryButton
                        title="SIGN IN"
                        onPress={() => { navigation.navigate('SignInScreen') }}
                    />
                </View>


            </ScrollView>


        </View>
    )
}





export default SignUpScreen





const styles = StyleSheet.create(
    {

        container: {
            flex: 1,
            backgroundColor: 'white'
        },

        details: {
            paddingHorizontal: 20,
            paddingBottom: "100%",
            backgroundColor: colors.banner_sale,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
        },

        view1: {
            alignItems: "center",
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 15
        },

        text1: {
            fontSize: 28,
            color: colors.primary_normal,
            fontWeight: 'bold'
        },

        view2: {
            justifyContent: 'flex-start',
            paddingHorizontal: 15
        },

        view3: {
            marginTop: 5,
            marginBottom: 10
        },

        text2: {
            fontSize: 15,
            color: colors.text_fuzz3
        },

        view4: {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.text_fuzz3,
            borderRadius: 12,
            paddingLeft: 5

        },

        view5: {
            marginLeft: 30,
            marginTop: 20
        },

        input1: {
            fontSize: 16
        },

        view6: {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.text_fuzz3,
            borderRadius: 12,
            paddingLeft: 5,
            marginTop: 20,
            height: 48
        },

        view7: {
            marginLeft: 0,
            maxWidth: "65%"
        },

        input2: {
            fontSize: 16,
            marginLeft: 0,
            marginBottom: 0
        },

        view8: {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.text_fuzz3,
            borderRadius: 12,
            paddingLeft: 5,
            marginTop: 20,
            height: 48
        },

        view9: {
            marginLeft: 0,
            maxWidth: "65%"
        },

        input3: {
            fontSize: 16,
            marginLeft: 0,
            marginBottom: 0
        },

        view10: {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.text_fuzz3,
            borderRadius: 12,
            paddingLeft: 5,
            marginTop: 20,
            height: 48
        },

        email: {
            fontSize: 24,
            padding: 0,
            marginBottom: 0,
            marginTop: 11,
            marginLeft: 2
        },

        view11: {
            marginLeft: 30,
            maxWidth: "65%"
        },

        input4: {
            fontSize: 16,
            marginLeft: -20,
            marginBottom: -10
        },

        view13: {
            flexDirection: "row",
            height: 40
        },

        view14: {
            borderWidth: 1,
            borderRadius: 12,
            borderColor: colors.text_fuzz3,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            paddingLeft: 5,
            marginTop: 20
        },

        view15: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
        },

        text3: {
            fontSize: 12
        },

        view16: { flexDirection: 'row' },

        text4: {
            textDecorationLine: 'underline',
            color: 'green',
            fontWeight: 'bold',
            fontSize: 12
        },

        title1: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -3

        },

        view17: {
            marginVertical: 10,
            marginTop: 15
        },

        view18: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        text5: {
            fontSize: 15,
            fontWeight: 'bold'
        },

        view19: {
            paddingHorizontal: 15

        },

        view20: {
            marginTop: 5,
            alignItems: 'center'
        },

        view21: {
            marginTop: 10
        },
    })