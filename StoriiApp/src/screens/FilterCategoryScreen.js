import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FoodController from '../backend/controllers/FoodController';
import { colors } from '../global/styles';
import SearchResultCard from '../components/SearchResultCard';
import SearchComponent from '../components/SearchComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FilterCategory = ({ route }) => {
  const { category } = route.params;
  const [foodList, setFoodList] = useState([]);
  const navigation = useNavigation();
  

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
    food.name.toLowerCase().includes(category.name.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchComponent />
      <View>
        <FlatList
          style={{ backgroundColor: colors.cardbackground }}
          data={searchResults}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => navigation.navigate('DetailScreen', { item })}>
              <SearchResultCard
                screenWidth={SCREEN_WIDTH}
                name={item.name}
                img={item.img}
                price={parseFloat(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              />
            </TouchableHighlight>
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.listHeader}>
                {searchResults.length} Results for {category.name}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default FilterCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  listHeader: {
    color: colors.primary_bold,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    marginTop: 30,
  },
});