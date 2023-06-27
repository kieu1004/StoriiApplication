import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import FoodController from '../backend/controllers/FoodController';
import CurryImagePicker from './CurryImagePicker';
import GridList from './GridList';

const FoodForm = (props) => {
  const [subIngredients, setSubIngredients] = useState([]);

  const setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <View style={styles.container}>
      <CurryImagePicker image={props.values.imageUri} onImagePicked={setFoodImage} />
      <TextInput
        value={props.values.name}
        style={styles.longFormInput}
        placeholder='Name'
        onChangeText={text => { props.setFieldValue('name', text) }}
      />
      <Text style={styles.validationText}> {props.errors.name}</Text>
      <TextInput
        value={props.values.category}
        style={styles.longFormInput}
        placeholder='Category'
        onChangeText={text => { props.setFieldValue('category', text) }}
      />
      <Text style={styles.validationText}> {props.errors.category}</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.formInput}
          onChangeText={text => { props.setFieldValue('subIngredient', text) }}
          placeholder='Sub-ingredient'
        />
        <Button
          style={styles.button}
          title='Add'
          onPress={() => {
            setSubIngredients([...subIngredients, props.values.subIngredient]);
            props.setFieldValue('subIngredient', '');
          }}
        />
      </View>
      <GridList items={subIngredients} />
      <Button title='Submit' onPress={() => props.handleSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16
  },
  validationText: {
    color: 'red'
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16
  },
});

export default withFormik({
  mapPropsToValues: ({ food }) => ({
    name: food ? food.name || '' : '',
    category: food ? food.category || '' : '',
    imageUri: food ? food.image || null : null,
    subIngredient: ''
  }),
  enableReinitialize: true,
  validationSchema: yup.object().shape({
    name: yup.string().max(30).required(),
    category: yup.string().max(15).required()
  }),
  handleSubmit: (values, { props }) => {
    values.subIngredients = props.food ? props.food.subIngredients || [] : [];

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