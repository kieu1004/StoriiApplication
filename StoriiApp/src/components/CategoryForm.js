import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button, ScrollView } from 'react-native';
import { withFormik } from 'formik';
import * as yup from 'yup';
import CurryImagePicker from './CurryImagePicker';
import GridList from './GridList';
import { colors } from '../global/styles';
import { PrimaryButton } from './Button';
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

const CategoryForm = (props) => {
  const [subIngredients, setSubIngredients] = useState([]);

  const setCategoryImage = (image) => {
    props.setFieldValue('imageUri', image.uri);
  }

  return (
    <View style={styles.container}>

      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>

        <CurryImagePicker image={props.values.imageUri} onImagePicked={setCategoryImage} />

        <FormInput
          title="Name"
          value={props.values.name}
          onChangeText={text => { props.setFieldValue('name', text) }}
          error={props.touched.name && props.errors.name}
        />
        
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

        {/* <GridList items={subIngredients} /> */}

      </ScrollView>

      <View style={styles.btnSubmit}>
        <PrimaryButton title='Submit' onPress={() => props.handleSubmit()} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: colors.banner_sale
  },
  details: {
    paddingHorizontal: 65,
    backgroundColor: colors.background,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  containerInput: {
    marginTop: 30
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
  }
});

export default withFormik({
  mapPropsToValues: ({ category }) => ({
    name: category ? category.name || '' : '',
    imageUri: category ? category.image || null : null,
    subIngredient: '',
  }),
  enableReinitialize: true,
  validationSchema: yup.object().shape({
    name: yup.string().max(30).required('Name is required'),
  }),
  handleSubmit: (values, { props }) => {
    values.subIngredients = props.category ? props.category.subIngredients || [] : [];

    if (props.category && props.category.id) {
      values.id = props.category.id;
      values.createdAt = props.category.createdAt;
      values.image = props.category.image;
      CategoryController.uploadCategory(values, props.onCategoryUpdated, { updating: true });
    } else {
      CategoryController.uploadCategory(values, props.onCategoryAdded, { updating: false });
    }
  },
})(CategoryForm);