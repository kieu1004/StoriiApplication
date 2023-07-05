import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native'
import { colors } from '../global/styles'



const SCREEN_WIDTH = Dimensions.get('window').width
const cardWidth = SCREEN_WIDTH / 2 - 20;

const SearchCategoryResultCard = ({ name, img, OnPressCategoryCard }) => {
    return (
        <TouchableOpacity
            underlayColor={colors.cardbackground}
            activeOpacity={0.9}
            onPress={OnPressCategoryCard}
        >
            <View style={styles.cardCategory}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Image source={{ uri: img }} style={{ height: 100, width: 120, resizeMode: 'contain' }} />
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}




export default SearchCategoryResultCard





const styles = StyleSheet.create({
    cardCategory: {
        height: 250,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: colors.cardbackground,
    },
})