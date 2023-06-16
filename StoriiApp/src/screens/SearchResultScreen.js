import React from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import SearchResultCard from '../components/SearchResultCard'
import { productData, providerData } from '../global/Data'
import { colors } from "../global/styles"





const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResultScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>

            <View>
                <FlatList

                    style={{ backgroundColor: colors.cardbackground }}
                    data={providerData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                        <SearchResultCard
                            screenWidth={SCREEN_WIDTH}
                            images={item.images}
                            averageReview={item.averageReview}
                            numberOfReview={item.numberOfReview}
                            providerName={item.providerName}
                            farAway={item.farAway}
                            businessAddress={item.businessAddress}
                            productData={item.productData}
                            OnPressProviderCard={() => { navigation.navigate("ProviderHomeScreen", { id: index, provider: item.providerName }) }}
                        />

                    )}


                    ListHeaderComponent={
                        <View>
                            <Text style={styles.listHeader}>{productData.length} Result for {route.params.item}</Text>
                        </View>
                    }


                    showsVerticalScrollIndicator={false}

                />
            </View>

        </View>
    )
}





export default SearchResultScreen





const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },

    listHeader: {
        color: colors.primary_bold,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: "bold"
    }
})