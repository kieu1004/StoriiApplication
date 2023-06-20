import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, parameters } from "../global/styles"





//Định nghĩa thành phần Header:
//Hiển thị tiêu đề trang.
//Nút return để quay lại trang trước đó.

/*
    - Sử dụng View, Text, StyleSheet, Dimensions, Icon để tạo giao diện.
*/





//Khai báo và định nghĩa hàm Header
export default function Header({ title, type, navigation }) {
    return (
        <View style={styles.header}>


            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Icon
                    type="material-community"
                    name={type}
                    color={colors.primary_bold}
                    size={30}
                    onPress={() => {
                        navigation.goBack() //trở lại trang trước đó.
                    }}
                />
            </View>


            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>


        </View>
    )
}





const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: "row",
        marginBottom: 30
    },

    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 30
    }
})