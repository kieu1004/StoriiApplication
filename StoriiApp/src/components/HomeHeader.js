import React from "react"
import {View, Text, StyleSheet} from 'react-native'
import {Icon, withBadge} from 'react-native-elements'
import {colors, parameters} from '../global/styles'





/** Định nghĩa thành phần HomeHeader:
 * Hiển thị tiêu đề trang chủ.
 * Nút mở menu, giỏ hàng.
 * 
 * Sử dụng View, Text, StyleSheet, withBadge Icon để tạo giao diện.
 */





//Khai báo và định nghĩa hàm HomeHeader
export default function HomeHeader({navigation}){

    const BadgeIcon = withBadge(0)(Icon)


    return(
        <View style={styles.header}>

            <View style={{alignItems:"center", justifyContent:"center", marginLeft:15}}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.primary_normal}
                    size={32}
                    onPress={()=>{
                        
                    }}
                />
            </View>


            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text style={{color:colors.primary_normal, fontSize:25, fontWeight:'bold'}}>STORII XpressFood</Text>
            </View>


            <View style={{alignItems:"center", justifyContent:"center", marginRight:15}}>
                <BadgeIcon
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.primary_light}
                />
            </View>

        </View>
    )
}





const styles = StyleSheet.create({
    header :{
        flexDirection:"row",
        backgroundColor: colors.primary_bold,
        height: parameters.headerHeight,
        justifyContent:"space-between"
    }
})