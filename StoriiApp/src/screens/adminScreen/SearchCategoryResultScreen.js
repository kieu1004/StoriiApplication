import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import CategoryController from '../../backend/controllers/CategoryController';
import { colors } from '../../global/styles';
import SearchCategoryResultCard from '../../components/SearchCategoryResultCard';

const SCREEN_WIDTH = Dimensions.get('window').width;


const SearchCategoryResultScreen = ({ navigation, route }) => {
  const [categoryList, setCategoryList] = useState([]);
  
  const loadCategoryList = async () => {
    try {
      const categories = await CategoryController.getCategoryList();
      setCategoryList(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategoryList();
  }, []);

  const searchResults = categoryList.filter((category) =>
    category.name.toLowerCase().includes(route.params.item.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={{ backgroundColor: colors.cardbackground }}
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SearchCategoryResultCard
              screenWidth={SCREEN_WIDTH}
              name={item.name}
              img={item.img}
              price={parseFloat(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              OnPressCategoryCard={() => {
                navigation.navigate('CategoryDetail');
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

export default SearchCategoryResultScreen;

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