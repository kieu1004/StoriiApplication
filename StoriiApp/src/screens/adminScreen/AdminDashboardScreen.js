import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions, StatusBar } from 'react-native'
import { TouchableHighlight } from "react-native-gesture-handler"
import { Icon } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import { colors, fonts, parameters } from "../../global/styles"
import AdminHeader from "../../components/AdminHeader";


const AdminDashboardScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>


            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="rgb(40, 145, 71)"
            />


            <AdminHeader navigation={navigation} />


        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
})

export default AdminDashboardScreen