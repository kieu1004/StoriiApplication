import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../global/styles';

const CheckOutScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [cartList, setCartList] = useState([]);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [recipientName, setRecipientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const userId = auth().currentUser.uid;

    useEffect(() => {
        getCartItems();
    }, [isFocused]);

    const getCartItems = async () => {
        try {
            const cartSnapshot = await database().ref(`Users/${userId}/cart`).once('value');
            const cartItems = cartSnapshot.val() || [];
            setCartList(cartItems);
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

    const updateCartItems = async (updatedCartItems) => {
        try {
            await database().ref(`Users/${userId}/cart`).set(updatedCartItems);
            setCartList(updatedCartItems);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getTotal = () => {
        let total = 0;
        cartList.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total;
    };

    const handleConfirm = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
            </View>
            <ScrollView style={styles.cartData}>
                {cartList.map((item) => (
                    <View key={item.productId} style={styles.cartCard}>
                        <View style={styles.orderItemInfo}>
                            <Image
                                source={{ uri: item.imageUrl }}
                                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                            />
                            <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>{item.name}</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        marginTop: 10,
                                        color: colors.primary_bold,
                                    }}
                                >
                                    {parseFloat(item.price).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Text>
                            </View>
                            <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
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
                                                item.quantity -= 1;
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
                                            item.quantity += 1;
                                            updateCartItems(cartList);
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>


            <ScrollView style={styles.orderSummary}>
            <Text style={styles.label}>Delivery Infomation</Text>
                <View style={styles.addressContainer}>
                    <TextInput
                        style={styles.input}
                        value={recipientName}
                        onChangeText={(text) => setRecipientName(text)}
                        placeholder="Enter recipient's name"
                    />
                </View>
                <View style={styles.addressContainer}>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Enter phone number"
                    />
                </View>
                <View style={styles.addressContainer}>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        placeholder="Enter delivery address"
                    />
                </View>





                <View style={styles.paymentContainer}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Picker
                        selectedValue={paymentMethod}
                        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Cash" value="Cash" />
                        <Picker.Item label="Credit Card" value="Credit Card" />
                        <Picker.Item label="PayPal" value="PayPal" />
                    </Picker>
                </View>

                <View style={styles.orderSummaryItem}>
                    <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                    <Text style={styles.orderSummaryValue}>
                        {getTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </Text>
                </View>

                <TouchableOpacity style={styles.orderButton} onPress={handleConfirm}>
                    <Text style={styles.orderButtonText}>CONFIRM</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 50,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
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
        marginBottom: 5,
    },
    actionBtn: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 5,
    },
    orderItemQuantityButton: {
        width: 30,
        height: 30,
        backgroundColor: colors.primary_bold,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    orderSummary: {
        paddingHorizontal: 40,
        paddingVertical: 5,
        backgroundColor: colors.primary_backgroud,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height:120,
    },
    orderSummaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    orderSummaryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text_fuzz3,
    },
    orderSummaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary_bold,
    },
    addressContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: colors.text_gray,
    },
    input: {
        height: 40,
        borderColor: colors.text_fuzz3,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    picker: {
        height: 40,
        borderColor: colors.text_fuzz3,
        borderWidth: 1,
        borderRadius: 5,
    },
    orderButton: {
        backgroundColor: colors.primary_normal,
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    orderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CheckOutScreen;