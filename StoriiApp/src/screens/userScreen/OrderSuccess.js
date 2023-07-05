import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../../global/styles'
import { PrimaryButton } from '../../components/Button'

export default function OrderSuccess({navigation}) {
    return (
        <View style={styles.sucesscontainer}>
            <Image
                source={require('../../assets/successfully.png')}
                style={styles.chefImage}
            />
            <View style={styles.content}>
                <Image
                    source={require('../../assets/pizzasuccess.png')}
                    style={styles.successImage}
                />
                <Text style={styles.successText}>Congratulation!</Text>
                <Text style={styles.successText}>Your order is accepted</Text>

                <View style={{ top: -60, width: "100%", height: 100, paddingHorizontal: 20 }}>
                    <PrimaryButton
                        title="Continue Order"
                        onPress={() => {
                            navigation.navigate('SearchScreen')
                        }} />
                </View>

            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    sucesscontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        marginTop: "40%"
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "20%",
        backgroundColor: colors.banner_sale,
        bottom: 0,
    },
    chefImage: {
        height: 300,
        width: "100%",
        resizeMode: 'contain',
        top: -30
    },
    successImage: {
        height: 140,
        top: -100,
        width: "100%",
        resizeMode: 'contain',
    },
    successText: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.primary_light,
        top: -100
    },
})