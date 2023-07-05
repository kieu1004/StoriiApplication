import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import FoodController from '../../backend/controllers/FoodController';
import { colors } from '../../global/styles';
import SearchResultCard from '../../components/SearchResultCard';
import UserController from '../../backend/controllers/UserController';
import database from '@react-native-firebase/database';

const SCREEN_WIDTH = Dimensions.get('window').width;


const SearchResultScreen = ({ navigation, route }) => {
  const item = route.params;

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

  const getProductDetails = (userId) => {
    return {
      userId: userId,
      productId: item._id,
      quantity: 1,
      price: item.price,
      imageUrl: item.img,
      name: item.name
    };
  };



  const onAddToCart = async (item) => {
    try {
      const userResponse = await UserController.getCurrentUser();
      if (userResponse.success) {
        const user = userResponse.user;
        const userId = user.id;

        console.log(user.cart);
        let tempCart = user.cart || [];
        if (tempCart.length > 0) {
          let existing = false;
          tempCart.map((itm) => {
            if (itm.productId === item._id && itm.userId === userId) {
              existing = true;
              itm.quantity = itm.quantity + 1;
            }
          });
          if (!existing) {
            tempCart.push(getProductDetails(userId, item));
          }
        } else {
          tempCart.push(getProductDetails(userId, item));
        }

        const userRef = database().ref('Users/' + userId);

        userRef.child('cart').set(tempCart);

        console.log(tempCart);
        getCartItems();
      } else {
        console.log(userResponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const getCartItems = async () => {
    try {
      const userResponse = await UserController.getCurrentUser();
      if (userResponse.success) {
        const user = userResponse.user;
        const cartItems = user.cart || [];
        console.log(cartItems);

      } else {
        console.log(userResponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);


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
              onAddToCart={() => onAddToCart(item)}
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