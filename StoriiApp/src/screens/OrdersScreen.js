import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { cartData } from '../global/Data'
import { colors } from '../global/styles'

const OrderScreen = () => {


    const [subtotal, setSubtotal] = useState(
        cartData.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const [tax, setTax] = useState(subtotal * 0.1)
    const [total, setTotal] = useState(subtotal + tax)

    const handleQuantityChange = (id, quantity) => {
        const updatedOrderList = cartData.map(item => {
            if (item.id === id) {
                return { ...item, quantity };
            }
            return item;
        })
        setSubtotal(
            updatedOrderList.reduce((sum, item) => sum + item.price * item.quantity, 0)
        )
        setTax(subtotal * 0.1);
        setTotal(subtotal + tax);
    }

    const handleRemoveItem = id => {
        const filteredOrderList = cartData.filter(item => item.id !== id);
        // setOrderList(filteredOrderList)
        setSubtotal(
            filteredOrderList.reduce((sum, item) => sum + item.price * item.quantity, 0)
        )
        setTax(subtotal * 0.1);
        setTotal(subtotal + tax);
    }




    return (
        <View style={styles.container}>
            <ScrollView style={styles.cartData}>

                {cartData.map(item => (
                    <View key={item.id} style={styles.cartCard}>
                        <View style={styles.orderItemInfo}>

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


                            <View style={{
                                height: 100,
                                marginLeft: 10,
                                paddingVertical: 20,
                                flex: 1,
                            }}>

                                <TouchableOpacity
                                    style={styles.orderItemRemove}
                                    onPress={() => handleRemoveItem(item.id)}
                                >
                                    <Icon type="ionicon" name="trash-outline" color="green" />
                                </TouchableOpacity>



                                <View style={styles.actionBtn}>
                                    <TouchableOpacity
                                        style={styles.orderItemQuantityButton}
                                        onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                        <Icon name="remove" size={24} color={colors.text_white} />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.orderItemQuantityInput}
                                        keyboardType="numeric"
                                        value={item.quantity.toString()}
                                        onChangeText={text => handleQuantityChange(item.id, parseInt(text))}
                                    />
                                    <TouchableOpacity
                                        style={styles.orderItemQuantityButton}
                                        onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        <Icon name="add" size={24} color={colors.text_white} />
                                    </TouchableOpacity>
                                </View>

                            </View>


                        </View>



                    </View>
                ))}
            </ScrollView>



            <View style={styles.orderSummary}>
                <View style={styles.orderSummaryItem}>
                    <Text style={styles.orderSummaryLabel}>Subtotal</Text>
                    <Text style={styles.orderSummaryValue}>$ {subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.orderSummaryItem}>
                    <Text style={styles.orderSummaryLabel}>Tax (10%)</Text>
                    <Text style={styles.orderSummaryValue}>$ {tax.toFixed(2)}</Text>
                </View>
                <View style={styles.orderSummaryItem}>
                    <Text style={styles.orderSummaryLabel}>Total</Text>
                    <Text style={styles.orderSummaryValue}>$ {total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    orderList: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderItemPrice: {
        fontSize: 16,
        marginLeft: 10,
    },
    orderItemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderItemQuantityButton: {
        width: 30,
        height: 30,
        backgroundColor: colors.primary_light,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    orderItemQuantityInput: {
        width: 35,
        height: 36,
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 15
    },
    orderItemRemove: {
        width: 20,
        height: 30,
        marginLeft: 80,
        textAlign: 'center',
        marginBottom:5
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
        height: 32,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: colors.cardbackground,
        borderRadius: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default OrderScreen