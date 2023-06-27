import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import CurryImagePicker from './CurryImagePicker';
import GridList from './GridList';

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

  const setFoodImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <View style={styles.container}>
      <CurryImagePicker image={props.values.imageUri} onImagePicked={setFoodImage} />
      <FormInput
        title="Name"
        value={props.values.name}
        onChangeText={text => { props.setFieldValue('name', text) }}
        error={props.touched.name && props.errors.name}
      />
      <FormInput
        title="Category"
        value={props.values.category}
        onChangeText={text => { props.setFieldValue('category', text) }}
        error={props.touched.category && props.errors.category}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.subInput]}
          onChangeText={text => { props.setFieldValue('subIngredient', text) }}
          placeholder='Sub-ingredient'
          placeholderTextColor='#999999'
        />
        <Button
          title='Add'
          onPress={() => {
            setSubIngredients([...subIngredients, props.values.subIngredient]);
            props.setFieldValue('subIngredient', '');
          }}
          color='#2F80ED'
        />
      </View>
      <GridList items={subIngredients} />
      <Button title='Submit' onPress={() => props.handleSubmit()} color='#2F80ED' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    backgroundColor: '#F7F7F7',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputTitle: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    width: 300,
    height: 50,
    color: '#333333',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  subInput: {
    flex: 1,
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Arial',
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