import React from "react"
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, parameters } from '../global/styles'





/** Định nghĩa thành phần FoodCard
 * 
 * Sử dụng Text, View, TouchableOpacity, Image, StyleSheet, Icon để tạo giao diện.
 */





//Khai báo và định nghĩa FoodCard
export default function FoodCard({

    //props để hiển thị thông tin sản phẩm
    OnPressFoodCard,
    providerName,
    deliveryAvailable,
    discountAvailable,
    discountPercent,
    numberOfReview,
    businessAddress,
    farAway,
    averageReview,
    images,
    screenWidth

}) {
    return (

        //Tạo khu vực có thể nhấn click để chuyển đến trang chi tiết sản phẩm
        <TouchableOpacity>


            <View style={{ ...styles.cardView, width: screenWidth }}>

                {/* Ảnh sản phẩm */}
                <Image
                    style={{ ...styles.image, width: screenWidth }}
                    source={{ uri: images }}
                />



                {/* Mô tả sản phẩm */}
                <View>
                    <View>
                        <Text style={styles.providerName}>{providerName}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles.distance}>
                            <Icon
                                name="place"
                                type="meterial"
                                size={18}
                                iconStyle={{ marginTop: 3 }}
                            />
                            <Text style={styles.Min}>{farAway} Min</Text>
                        </View>

                        <View style={{ flex: 9, flexDirection: "row" }}>
                            <Text style={styles.address}>{businessAddress}</Text>
                        </View>
                    </View>
                </View>

            </View>




            {/* Review tag */}
            <View style={styles.review}>
                <Text style={styles.average}>{averageReview}</Text>
                <Text style={styles.numberofreview}>{numberOfReview} reviews</Text>
            </View>


        </TouchableOpacity>
    )
}





const styles = StyleSheet.create({
    cardView: {
        marginHorizontal: 9,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary_normal,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },

    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 150
    },

    providerName: {
        fontSize: 17,
        fontWeight: "bold",
        color: colors.primary_bold,
        marginTop: 5,
        marginLeft: 10
    },

    distance: {
        flex: 4,
        flexDirection: "row",
        borrderRightColor: colors.primary_light,
        paddingHorizontal: 5,
        borderRightWidth: 1
    },

    Min: {
        fontSize: 12,
        fontWeight: "bold",
        paddingTop: 5,
        color: colors.primary_normal
    },

    address: {
        fontSize: 12,
        paddingTop: 5,
        color: colors.primary_normal,
        paddingHorizontal: 10
    },

    review: {
        position: "absolute",
        top: 0,
        right: 10,
        backgroundColor: 'rgba(52,52,52,0.3)',
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 12
    },

    average: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: -3
    },

    numberofreview: {
        color: "white",
        fontSize: 13,
        marginRight: 0,
        marginLeft: 0
    }
})