import React, { Component } from 'react';
import { StyleSheet, Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import FoodController from '../../backend/controllers/FoodController';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class FoodList extends Component {
  state = {
    foodList: [],
    selectedIndex: 0
  }

  componentDidMount() {
    this.loadFoodList();
  }

  loadFoodList = () => {
    FoodController.getFoodList(this.onFoodsReceived);
  }

  onFoodAdded = (food) => {
    this.setState(prevState => ({
      foodList: [...prevState.foodList, food]
    }));
    this.props.navigation.popToTop();
  }

  onFoodDeleted = () => {
    const { selectedIndex, foodList } = this.state;
    const newFoodList = [...foodList];
    newFoodList.splice(selectedIndex, 1);

    this.setState({
      foodList: newFoodList
    });

    this.props.navigation.popToTop();
  }

  onFoodsReceived = (foodList) => {
    this.setState({
      foodList: foodList
    });
  }

  navigateToFoodForm = () => {
    this.props.navigation.navigate('FoodForm', { foodAddedCallback: this.onFoodAdded });
  }

  navigateToFoodDetail = (item, index) => {
    this.setState({ selectedIndex: index });
    this.props.navigation.navigate('FoodDetail', { food: item, foodDeletedCallback: this.onFoodDeleted });
  }

  renderEmptyState = () => (
    <View style={styles.textContainer}>
      <Text style={styles.emptyTitle}>No Foods found</Text>
      <Text style={styles.emptySubtitle}>Add a new food using the + button below</Text>
      {this.renderActionButton()}
    </View>
  );

  renderActionButton = () => (
    <ActionButton
      buttonColor='blue'
      onPress={this.navigateToFoodForm}
    />
  );

  render() {
    const { foodList } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {foodList.length > 0 ? (
          <FlatList
            data={foodList}
            ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`Category: ${item.category}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && { uri: item.image }
                }}
                onPress={() => this.navigateToFoodDetail(item, index)}
              />
            )}
          />
        ) : this.renderEmptyState()}
        {this.renderActionButton()}
      </SafeAreaView>
    );
  }
}

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