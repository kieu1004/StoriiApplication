import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'


import { colors } from '../global/styles'
import { cartData } from '../global/Data'
import { PrimaryButton } from '../components/Button'






const CartScreen = ({ navigation }) => {
    const CartCard = ({ item }) => {
        return (
            <View style={styles.cartCard}>


                <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />


                <View style={{
                    height: 100,
                    marginLeft: 10,
                    paddingVertical: 20,
                    flex: 1,
                }}>

                    <Text style={{ fontSize: 16 }}>{item.name}</Text>

                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, color: colors.primary_bold }}>$ {item.price}</Text>

                </View>


                <View style={{ marginRight: 5, alignItems: 'center' }}>
                    <View style={styles.actionBtn}>
                        <View backgroundColor={colors.banner_sale} borderRadius={2}>
                            <Icon name="remove" size={25} color={colors.text_white} />
                        </View>

                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginRight: 10 }}>3</Text>

                        <View backgroundColor={colors.banner_sale} borderRadius={2}>
                            <Icon name="add" size={25} color={colors.text_white} />
                        </View>
                    </View>
                </View>


            </View>
        )
    }





    return (
        <SafeAreaView style={{ backgroundColor: colors.text_white, flex: 1 }}>


            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={cartData}
                renderItem={({ item }) => <CartCard item={item} />}

                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (

                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$50</Text>
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                            <PrimaryButton title="CHECKOUT" />
                        </View>
                    </View>

                )}
            />


        </SafeAreaView>
    )
}





const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 50
    },

    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: colors.text_white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: colors.cardbackground,
        borderRadius: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
})

export default CartScreen