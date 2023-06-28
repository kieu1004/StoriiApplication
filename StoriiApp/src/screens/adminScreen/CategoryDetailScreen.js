import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import CategoryController from '../../backend/controllers/CategoryController';

class CategoryDetail extends Component {

  static navigationOptions = () => {
    return {
      title: 'Category Details'
    }
  };

  deleteCategory = (category) => {
    CategoryController.deleteCategory(category, () => {
      const onCategoryDeleted = this.props.navigation.getParam('categoryDeletedCallback');
      onCategoryDeleted();
      this.props.navigation.goBack();
    });
  }

  render() {
    // const category = this.props.navigation.getParam('category');
    // const onCategoryDeleted = this.props.navigation.getParam('categoryDeletedCallback');

    const { category, categoryDeletedCallback } = this.props.route.params;


    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('CategoryForm', {
                category: category
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
                  { text: 'OK', onPress: () => { this.deleteCategory(category) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>

        <Image style={styles.image} source={category.image && { uri: category.image }} />
        <Text style={styles.headerText}>{category.name}</Text>
        <Text style={styles.ingredientText}>Ingredients</Text>
        {
          category.subIngredients === undefined || category.subIngredients.length == 0 ?
            <Text>None</Text> : <FlatList
              data={category.subIngredients}
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

export default CategoryDetail;