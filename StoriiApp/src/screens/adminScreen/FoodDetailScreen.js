import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import FoodController from '../../backend/controllers/FoodController';

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
        <Image style={styles.image} source={food.image && { uri: food.image }} />
        <Text style={styles.headerText}>{food.name}</Text>
        <Text style={styles.priceText}>Price: {food.price}</Text>
        <Text style={styles.quantityText}>Quantity: {food.quantity}</Text>
        <Text style={styles.descriptionText}>{food.description}</Text>

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
    fontSize: 32,
    marginBottom: 16
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16
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
    fontSize: 20,
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
  }
});

export default FoodDetail;