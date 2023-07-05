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
    // const food = this.props.navigation.getParam('food');
    // const onFoodDeleted = this.props.navigation.getParam('foodDeletedCallback');

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
              <View style={styles.iconContainer}>
                <Icon name="favorite-border" color={colors.primary_bold} size={25} />
              </View>
            </View>

            <Text style={styles.priceText}>{parseFloat(food.price).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>

            <Text style={styles.detailsText}>{food._description}</Text>

          </View>
        </ScrollView>

        <Text style={styles.ingredientText}>Ingredients</Text>
        {
          food.subIngredients === undefined || food.subIngredients.length == 0 ?
            <Text>None</Text> : <FlatList
              data={food.subIngredients}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}>{item}</Text>
              }
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    marginBottom: 16
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 20,
    marginBottom: 16
  },
  quantityText: {
    fontSize: 20,
    marginBottom: 16
  },
  priceText: {
    fontSize: 20,
    marginBottom: 16
  },
  providerText: {
    fontSize: 20,
    marginBottom: 16
  },
  descriptionText: {
    fontSize: 15,
    marginBottom: 32
  },
  ingredientText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 16
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  container: {
    alignItems: 'center'
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey'
  },


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

export default FoodDetail;