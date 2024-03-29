import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { colors } from '../global/styles';
import CurryImagePicker from './CurryImagePicker';
import GridList from './GridList';
import { PrimaryButton } from './Button';
import FoodController from '../backend/controllers/FoodController';
import CategoryController from '../backend/controllers/CategoryController';

const FormInput = ({ title, value, onChangeText, error }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>{title}</Text>
    <TextInput
      value={value}
      style={styles.input}
      onChangeText={onChangeText}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const FoodForm = (props) => {

  const [subIngredients, setSubIngredients] = useState([]);
  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    getCategoryList();
  }, []);


  const getCategoryList = async () => {
    try {
      const categories = await CategoryController.getCategoryList();
      setCategoryList(categories);
    } catch (error) {
      console.error('Error getting category list:', error);
    }
  };


  const setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  };



  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>
        <CurryImagePicker image={props.values.imageUri} onImagePicked={setFoodImage} />
        <FormInput
          title="Name"
          value={props.values.name}
          onChangeText={text => { props.setFieldValue('name', text) }}
          error={props.touched.name && props.errors.name}
        />

        <FormInput
          title="Price"
          value={props.values.price}
          onChangeText={text => { props.setFieldValue('price', text) }}
          error={props.touched.price && props.errors.price}
        />
        <FormInput
          title="Quantity"
          value={props.values.quantity}
          onChangeText={text => { props.setFieldValue('quantity', text) }}
          error={props.touched.quantity && props.errors.quantity}
        />
        <FormInput
          title="Description"
          value={props.values.description}
          onChangeText={text => { props.setFieldValue('description', text) }}
          error={props.touched.description && props.errors.description}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Category</Text>
          <ModalDropdown
            options={categoryList.map((category) => category.name)}
            defaultValue="Select Category"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
            dropdownTextStyle={styles.dropdownTextStyle}
            onSelect={(index) => {
              props.setFieldValue('idCategory', categoryList[index].id);
            }}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.formInput}
            onChangeText={text => { props.setFieldValue('subIngredient', text) }}
            placeholder='Sub-ingredient'
          />
          <Button
            title='Add'
            onPress={() => {
              setSubIngredients([...subIngredients, props.values.subIngredient]);
              props.setFieldValue('subIngredient', '');
            }}
          />
        </View>

        <GridList items={subIngredients} />

      </ScrollView>
      <View style={styles.btnSubmit}>
        <PrimaryButton title='Submit' onPress={() => props.handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: colors.banner_sale,
  },
  details: {
    paddingHorizontal: 65,
    backgroundColor: colors.background,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  containerInput: {
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#B5B4BC',
    borderRadius: 4,
    padding: 8,
    height: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#B5B4BC',
    borderRadius: 4,
    padding: 8,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#B5B4BC',
    borderRadius: 4,
  },
  dropdownTextStyle: {
    fontSize: 14,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  formInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B5B4BC',
    borderRadius: 4,
    padding: 8,
    height: 40,
    marginRight: 8,
  },
  btnSubmit: {
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 80,
  },
});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food ? food.name || '' : '',
    quantity: food ? food.quantity || '' : '',
    price: food ? food.price || '' : '',
    description: food ? food.description || '' : '',
    imageUri: food ? food.image || null : null,
    subIngredient: '',
    idCategory: food ? food.idCategory || null : null,
  }),
  enableReinitialize: true,
  validationSchema: yup.object().shape({
    name: yup.string().max(30).required('Name is required'),
    quantity: yup.string().max(10).required('Quantity is required'),
    price: yup.string().max(10).required('Price is required'),
    description: yup.string().max(100).required('Description is required'),
  }),
  handleSubmit: (values, { props }) => {
    values.subIngredients = props.food ? props.food.subIngredients || [] : [];
    values.idCategory = values.idCategory || null;

    if (props.food && props.food.id) {
      values.id = props.food.id;
      values.createdAt = props.food.createdAt;
      values.image = props.food.image;
      FoodController.uploadFood(values, props.onFoodUpdated, { updating: true });
    } else {
      FoodController.uploadFood(values, props.onFoodAdded, { updating: false });
    }
  },
})(FoodForm);