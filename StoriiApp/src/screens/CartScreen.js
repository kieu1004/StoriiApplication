import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useIsFocused } from '@react-navigation/native'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'


import { colors } from '../global/styles'
import { cartData } from '../global/Data'
import { PrimaryButton } from '../components/Button'






const CartScreen = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [cartList, setCartList] = useState([]);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        getCartItems();
    }, [isFocused]);

    const getCartItems = async () => {
        try {
            const cartSnapshot = await database().ref(`Users/${userId}/cart`).on('value', (snapshot) => {
                const cartItems = snapshot.val() || [];
                setCartList(cartItems);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const addItemToCart = async (item) => {
        try {
            const cartSnapshot = await database().ref(`Users/${userId}/cart`).once('value');
            const cartItems = cartSnapshot.val() || [];
            cartItems.push(item);
            await database().ref(`Users/${userId}/cart`).set(cartItems);
            getCartItems();
        } catch (error) {
            console.log(error.message);
        }
    };

    const removeItemFromCart = async (item) => {
        try {
            const cartSnapshot = await database().ref(`Users/${userId}/cart`).once('value');
            let cartItems = cartSnapshot.val() || [];
            cartItems = cartItems.filter((cartItem) => cartItem.productId !== item.productId);
            await database().ref(`Users/${userId}/cart`).set(cartItems);
            getCartItems();
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateCartItems = async (cartItems) => {
        try {
            await database().ref(`Users/${userId}/cart`).set(cartItems);
            getCartItems();
        } catch (error) {
            console.log(error.message);
        }
    };

    const getTotal = () => {
        let total = 0;
        cartList.map((item) => {
            total = total + item.quantity * item.price;
        });
        return total;
    };


    const CartCard = ({ item }) => {
        return (
            <View style={styles.cartCard}>


                <Image source={{ uri: item.imageUrl }} style={{ height: 80, width: 80, resizeMode: 'contain' }} />


                <View style={{
                    height: 100,
                    marginLeft: 10,
                    paddingVertical: 20,
                    flex: 1,
                }}>

                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 10, color: colors.primary_bold }}>
                        {parseFloat(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>

                </View>


                <View style={{ marginRight: 15, alignItems: 'center' }}>

                    <View style={styles.actionBtn}>
                        <TouchableOpacity
                            style={styles.qtybtn}
                            onPress={() => {
                                if (item.quantity > 1) {
                                    item.quantity = item.quantity - 1;
                                    updateCartItems(cartList);
                                } else {
                                    removeItemFromCart(item);
                                }
                            }}>
                            <Icon name="remove" size={20} color={colors.text_white} />
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.qtybtn}
                            onPress={() => {
                                item.quantity = item.quantity + 1;
                                updateCartItems(cartList);
                            }}>
                            <Icon name="add" size={25} color={colors.text_white} />
                        </TouchableOpacity>

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

            <ScrollView>
                {cartList.length === 0 ? (
                    <View style={styles.emptyCartContainer}>
                        <Image
                            source={{ uri: "https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" }}
                            style={styles.emptyCartImage}
                        />
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    </View>

                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        data={cartList}
                        renderItem={({ item }) => <CartCard item={item} />}
                        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                        ListFooterComponent={() => (
                            <View style={styles.footer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text_white }}>
                                        {getTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                                    <PrimaryButton title="CHECKOUT" />
                                </View>
                            </View>
                        )}
                    />
                )}
            </ScrollView>

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

    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyCartImage: {
        height: 300,
        width: "100%",
        resizeMode: 'contain',
    },
    emptyCartText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.primary_bold,
    },

    cartCard: {
        height: 120,
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
        width: 100,
        height: 30,
        backgroundColor: colors.cardbackground,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 12
    },
    qtybtn: {
        width: 25,
        height: 25,
        backgroundColor: colors.banner_sale,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25,
    },

    footer: {
        position: 'absolute',
        marginLeft: 20,
        bottom: 0,
        width: '100%',
        backgroundColor: colors.banner_sale,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
})

export default CartScreen