import React, { Component } from 'react';
import CategoryForm from '../../components/CategoryForm';

export default class CategoryFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('category') ? 'Edit Category' : 'New Category'
    }
  };

  state = {
    category: {
      name: '',
      subIngredients: []
    },
    currentSubIngredient: null,
  }

  componentDidMount() {
    const currentCategory = this.props.navigation.getParam('category');

    if (currentCategory) {
      this.setState(prevState => ({ category: prevState.category = currentCategory }))
    }
  }

  onCategoryUpdated = (category) => {
    console.log(category);
    this.props.navigation.popToTop();
  }

  setCurrentSubIngredient = (text) => {
    this.setState(prevState => ({
      currentSubIngredient: prevState.currentSubIngredient = text
    }));
  }

  submitSubIngredients = () => {
    let ingredient = this.state.currentSubIngredient;

    if (ingredient && ingredient.length > 2) {
      this.setState(prevState => ({
        category: { ...prevState.category, subIngredients: [...prevState.category.subIngredients, ingredient] },
      }))
    }
  }

  render() {
    return (
      <CategoryForm
        setSubIngredients={this.setCurrentSubIngredient}
        submitSubIngredients={this.submitSubIngredients}
        category={this.state.category}
        onCategoryAdded={this.props.navigation.getParam('categoryAddedCallback')}
        onCategoryUpdated={this.onCategoryUpdated}
      />
    );
  }
}