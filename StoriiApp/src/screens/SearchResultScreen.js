import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native'
import FoodController from '../backend/controllers/FoodController'
import { colors } from "../global/styles"

import SearchResultCard from '../components/SearchResultCard'





const SCREEN_WIDTH = Dimensions.get('window').width


const SearchResultScreen = ({ navigation, route }) => {

    const [foodList, setFoodList] = useState([]);
    const loadFoodList = async () => {
        try {
            const foods = await FoodController.getFoodList();
            setFoodList(foods);
            return foods;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await loadFoodList();
                console.log(result); // Log the foods data
            } catch (error) {
                console.log(error); // Log any errors that occurred
            }
        };

        loadData();
    }, []);



    
    return (
        <View style={styles.container}>

            <View>
                <FlatList

                    style={{ backgroundColor: colors.cardbackground }}
                    data={foodList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                        <SearchResultCard
                            screenWidth={SCREEN_WIDTH}
                            name={item._name}
                            img={item._img}
                            price={item._price}
                            OnPressFoodCard={() => { navigation.navigate("DetailScreen") }}
                        />

                    )}


                    ListHeaderComponent={
                        <View>
                            <Text style={styles.listHeader}>{foodList.length} Result for {route.params.item}</Text>
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