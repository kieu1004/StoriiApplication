import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Image,ScrollView } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import FoodController from '../../backend/controllers/FoodController';
import { colors } from '../../global/styles';

class FoodDetail extends Component {

  static navigationOptions = () => {
    return {
      title: 'Food Details'
    }
  };

  deleteFood = (food) => {
    FoodController.deleteFood(food, () => {
      const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');
      onFoodDeleted();
      this.props.navigation.goBack();
    });
  }

  render() {
    const { food, foodDeletedCallback } = this.props.route.params;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('FoodForm', {
                food: food
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: 'OK', onPress: () => { this.deleteFood(food) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 280 }}>
            <Image source={{ uri: food._img }} style={{ height: 300, width: 300, resizeMode: 'contain' }} />
          </View>
          <View style={styles.details}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text_white }}>{food._name}</Text>
            </View>

            <Text style={styles.priceText}>Price: {parseFloat(food.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
            <Text style={styles.quantityText}>Quantity: {food._quantity}</Text>

            <Text style={styles.detailsText}>{food._description}</Text>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  
  header: {
    paddingVertical: 20,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  details: {
    paddingHorizontal: 60,
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
  quantityText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    color: colors.text_white,
  },
});

export default FoodDetail;