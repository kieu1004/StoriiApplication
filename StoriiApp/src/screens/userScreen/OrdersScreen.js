import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import { colors } from '../../global/styles'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'

const OrderScreen = ({ navigation }) => {
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




    return (
        <View style={styles.container}>
            <ScrollView style={styles.cartData}>
                {cartList.map((item) => (
                    <View key={item.productId} style={styles.cartCard}>
                        <View style={styles.orderItemInfo}>
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


                            <View style={{
                                height: 100,
                                marginLeft: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}>

                                <TouchableOpacity
                                    style={styles.orderItemRemove}
                                    onPress={() => removeItemFromCart(item)}
                                >
                                    <Icon type="ionicon" name="trash-outline" color="green" />
                                </TouchableOpacity>

                                <View style={styles.actionBtn}>
                                    <TouchableOpacity
                                        style={styles.orderItemQuantityButton}
                                        onPress={() => {
                                            if (item.quantity > 1) {
                                                item.quantity = item.quantity - 1;
                                                updateCartItems(cartList);
                                            } else {
                                                removeItemFromCart(item);
                                            }
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>-</Text>
                                    </TouchableOpacity>


                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.quantity}</Text>


                                    <TouchableOpacity
                                        style={styles.orderItemQuantityButton}
                                        onPress={() => {
                                            item.quantity = item.quantity + 1;
                                            updateCartItems(cartList);
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>+</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                    </View>
                ))
                }
            </ScrollView >


            <View style={styles.orderSummary}>
                <View style={styles.orderSummaryItem}>
                    <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                    <Text style={styles.orderSummaryValue}>{getTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
                {/* Add tax calculation if needed */}
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    cartData: {
        flex: 1,
        paddingHorizontal: 2,
        paddingTop: 20,
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

    orderItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    orderItemRemove: {
        width: 20,
        height: 30,
        marginLeft: 80,
        textAlign: 'center',
        marginBottom: 5
    },

    actionBtn: {
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: colors.cardbackground,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    orderItemQuantityButton: {
        width: 30,
        height: 30,
        backgroundColor: colors.primary_light,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25,
    },

    orderSummary: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },

    orderSummaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },

    orderSummaryLabel: {
        fontSize: 16,
    },

    orderSummaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    addRemoveView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToCartBtn: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
    },
    checkoutView: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default OrderScreen;