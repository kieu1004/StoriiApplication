import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, FlatList, SafeAreaView, Text, View, Image } from 'react-native';
import FoodController from '../../backend/controllers/FoodController';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { colors } from '../../global/styles';

const FoodList = ({ navigation }) => {

  const [foodList, setFoodList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loadFoodList = async () => {
    try {
      const foods = await FoodController.getFoodList();
      setFoodList(foods);
      return foods;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await loadFoodList();
        console.log(result); // Log the foods data
      } catch (error) {
        console.log(error); // Log any errors that occurred
      }
    };

    loadData();
  }, []);

  onFoodAdded = (food) => {
    setFoodList((prevFoodList) => [...prevFoodList, food]);
    navigation.popToTop();
  }

  onFoodDeleted = () => {
    const newFoodList = [...foodList];
    newFoodList.splice(selectedIndex, 1);
    setFoodList(newFoodList);
    navigation.popToTop();
  }

  const navigateToFoodForm = () => {
    this.props.navigation.navigate('FoodForm', { foodAddedCallback: onFoodAdded });
  }

  const navigateToFoodDetail = (item, index) => {
    setSelectedIndex(index);
    navigation.navigate('FoodDetail', { food: item, categoryDeletedCallback: onCategoryDeleted });
  }

  const renderEmptyState = () => (
    <View style={styles.textContainer}>
      <Text style={styles.emptyTitle}>No Foods found</Text>
      <Text style={styles.emptySubtitle}>Add a new food using the + button below</Text>
      {renderActionButton()}
    </View>
  );

  const renderActionButton = () => (
    <ActionButton buttonColor={colors.primary_normal} onPress={navigateToFoodForm} />
  );

  const renderItem = ({ item }) => {
    return (
      <ListItem
        containerStyle={styles.listItem}
        onPress={() => navigateToFoodDetail(item, foodList.indexOf(item))}
      >
        <Image source={{ uri: item._img }} style={styles.foodImage} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {foodList.length > 0 ? (
        <FlatList
          data={foodList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Divider}
        />

      ) : (
        renderEmptyState()
      )}
      {renderActionButton()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  foodImage:{
    width: 50,
    height: 50
},
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default FoodList;