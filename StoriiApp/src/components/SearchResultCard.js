import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../global/styles';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const cardWidth = SCREEN_WIDTH / 2 - 20;

const SearchResultCard = ({ name, price, img, OnPressFoodCard, onAddToCart }) => {
  return (
    <TouchableOpacity
      underlayColor={colors.cardbackground}
      activeOpacity={0.9}
      onPress={OnPressFoodCard}
    >
      <View style={styles.cardProduct}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: img }} style={{ height: 100, width: 120, resizeMode: 'contain' }} />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.primary_bold }}>
            {price}
          </Text>

          <TouchableOpacity style={styles.addToCart} onPress={onAddToCart}>
            <Icon name="add" size={20} color={colors.cardbackground} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;

const styles = StyleSheet.create({
  cardProduct: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: colors.cardbackground,
  },

  addToCart: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: colors.primary_bold,
    justifyContent: 'center',
    alignItems: 'center',
  },
});