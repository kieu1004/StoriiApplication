import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserController from '../../backend/controllers/UserController';
import database from '@react-native-firebase/database';

import { colors } from '../../global/styles';
import { PrimaryButton } from '../../components/Button';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  const formattedPrice = parseFloat(item.price).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const getProductDetails = (userId) => {
    return {
      userId: userId,
      productId: item._id,
      quantity: 1,
      price: item.price,
      imageUrl: item._img, 
      name: item._name
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
            tempCart.push(getProductDetails(userId));
          }
        } else {
          tempCart.push(getProductDetails(userId));
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
    <SafeAreaView style={{ backgroundColor: colors.text_white }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} marginTop={10} onPress={navigation.goBack} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 280 }}>
          <Image source={{ uri: item._img }} style={{ height: 300, width: 300, resizeMode: 'contain' }} />
        </View>
        <View style={styles.details}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_white }}>{item._name}</Text>
            <View style={styles.iconContainer}>
              <Icon name="favorite-border" color={colors.primary_bold} size={25} />
            </View>
          </View>

          <Text style={styles.priceText}>{formattedPrice}</Text>

          <Text style={styles.detailsText}>{item._description}</Text>

          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <PrimaryButton title="Add To Cart" onPress={() => onAddToCart(item)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: '100%',
    backgroundColor: colors.banner_sale,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 30,
  },

  iconContainer: {
    backgroundColor: colors.text_white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },

  detailsText: {
    marginTop: 10,
    marginBottom: 10,
    lineHeight: 22,
    fontSize: 15,
    color: colors.text_white,
  },

  priceText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    color: colors.text_white,
  },
});

export default DetailsScreen;