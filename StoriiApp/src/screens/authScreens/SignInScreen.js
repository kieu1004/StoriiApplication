import React, {useState, useRef} from "react";

import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import { colors, parameters } from "../../global/styles"

import { Icon, Button, SocialIcon} from 'react-native-elements'
import Header from '../../components/Header'
import *as Animatable from 'react-native-animatable'


export default function SignInScreen(navigation) {

    const [TextInput2Fossued, setTextInput2Fossued] = useState(false)

    const TextInput1 = useRef(1)
    const TextInput2 = useRef(2)

    return (
        <View style={styles.container}>
            <Header
                title="My ACCOUNT"
                type="arrow-left"
                navigation={navigation}
            />

            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={styles.text1}>Sign In</Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1}>Please enter the email and pass</Text>
                <Text style={styles.text1}>registered with your account</Text>
            </View>

            <View>
                <View style={{ marginTop: 20 }}>

                    <View>
                        <TextInput
                            style={styles.TextInput1}
                            placeholder="Email"
                            ref={TextInput1}
                        />
                    </View>

                    <View style={styles.TextInput2}>
                        <Animatable.View>
                            <Icon
                                name="lock"
                                iconStyle={{ color: colors.primary_bold }}
                                type="material"
                                style={{}}
                            />
                        </Animatable.View>

                            <TextInput
                                style={{width:"80%"}}
                                placeholder="Password"
                                ref={TextInput2}
                                onFocus={()=>{
                                    setTextInput2Fossued(false)
                                }}
                                onBlur={()=>{
                                    setTextInput2Fossued(true)
                                }}
                            />

                        <Animatable.View animation={TextInput2Fossued?"":"fadeInLeft"} duration={400}>
                            <Icon
                                name="visibility-off"
                                iconStyle={{ color: colors.primary_bold }}
                                type="material"
                                style={{marginRight:10}}
                            />
                        </Animatable.View>
                    </View>
                </View>

                <View style={{marginHorizontal:20, marginVertical:30}}>
                    <Button
                        title = "SIGN IN"
                        buttonStyle = {parameters.styleButton}
                        titleStyle = {parameters.buttonTitle}
                        onPress={()=>{
                            navigation.navigate('HomeScreen')
                        }}
                    />
                </View>

                <View style={{alignItems:"center", marginTop:10}}>
                    <Text style={{...styles.text1, textDecorationLine:"underline"}}>Forgot Password ?</Text>
                </View>

                <View style={{alignItems:"center", marginTop:10,marginBottom:30}}>
                    <Text style={{fontSize:20, fontWeight:"bold"}}>OR</Text>
                </View>

                <View style={{marginHorizontal:10, marginTop:10}}>
                    <SocialIcon
                        title="Sign in with Facebook"
                        button
                        type="facebook"
                        style={styles.SocialIcon}
                        onPress={()=>{

                        }}
                    />
                </View>

                <View style={{marginHorizontal:10, marginTop:10}}>
                    <SocialIcon
                        title="Sign in with Google"
                        button
                        type="google"
                        style={styles.SocialIcon}
                        onPress={()=>{

                        }}
                    />
                </View>

                <View style={{marginTop:25, marginLeft:20}}>
                    <Text style={{...styles.text1}}>New on XpressProduct ?</Text>
                </View>

                <View style={{alignItems:"flex-end", marginHorizontal:20}}>
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
    container: {
        flex: 1
    },

    text1: {
        color: colors.primary_bold,
        fontSize: 16
    },

    TextInput1: {
        borderWidth: 1,
        borderColor: colors.primary_normal,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        paddingLeft: 15
    },

    TextInput2: {
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 20,
        borderColor: colors.primary_normal,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 15
    },

    SocialIcon :{
        borderRadius: 12,
        height: 50
    },

    createButton :{
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary_bold,
        height: 40,
        paddingHorizontal: 20
    },

    createButtonTitle :{
        color: colors.primary_bold,
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }
})