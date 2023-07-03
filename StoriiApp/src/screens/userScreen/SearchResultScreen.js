import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import FoodController from '../../backend/controllers/FoodController';
import { colors } from '../../global/styles';
import SearchResultCard from '../../components/SearchResultCard';

const SCREEN_WIDTH = Dimensions.get('window').width;


const SearchResultScreen = ({ navigation, route }) => {
  const [foodList, setFoodList] = useState([]);
  
  const loadFoodList = async () => {
    try {
      const foods = await FoodController.getFoodList();
      setFoodList(foods);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFoodList();
  }, []);

  const searchResults = foodList.filter((food) =>
    food.name.toLowerCase().includes(route.params.item.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={{ backgroundColor: colors.cardbackground }}
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SearchResultCard
              screenWidth={SCREEN_WIDTH}
              name={item.name}
              img={item.img}
              price={parseFloat(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              OnPressFoodCard={() => {
                navigation.navigate('DetailScreen');
              }}
            />
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.listHeader}>
                {searchResults.length} Results for {route.params.item}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listHeader: {
    color: colors.primary_bold,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});