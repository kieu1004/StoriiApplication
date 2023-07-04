import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withFormik } from 'formik';
import * as yup from 'yup';

import { colors } from '../global/styles';
import CurryImagePicker from './CurryImagePicker';
import { PrimaryButton } from './Button';
import UserController from '../backend/controllers/UserController';
import UserModel from '../backend/models/UserModel';

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

const ProfileForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const setUserImage = (image) => {
    setFieldValue('imageUri', image.uri);
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>
        <CurryImagePicker image={values.imageUri} onImagePicked={setUserImage} />

        <FormInput
          title="Name"
          value={values.name}
          onChangeText={handleChange('name')}
          error={touched.name && errors.name}
        />

        <TouchableOpacity style={styles.inputContainer} onPress={showDatePickerModal}>
          <Text style={styles.inputTitle}>Date of Birth</Text>
          <Text>{selectedDate ? formatDate(selectedDate) : 'Select your date of birth'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const text = formatDate(selectedDate);
              setFieldValue('dateOfBirth', text);
            }}
          />
        )}

        <FormInput
          title="Phone number"
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          error={touched.phoneNumber && errors.phoneNumber}
        />

        <FormInput
          title="Address"
          value={values.address}
          onChangeText={handleChange('address')}
          error={touched.address && errors.address}
        />

        <View style={styles.btnSubmit}>
          <PrimaryButton title="Confirm" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    backgroundColor: colors.banner_sale,
  },
  details: {
    paddingHorizontal: 65,
    backgroundColor: colors.background,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
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
  btnSubmit: {
    marginTop: 50,
    marginBottom: 50,
    marginHorizontal: 80,
  },
});

export default withFormik({
  mapPropsToValues: ({ user }) => ({
    imageUri: user && user.avatar ? user.avatar : '',
    name: user && user.fullName ? user.fullName : '',
    dateOfBirth: user && user.dateOfBirth ? user.dateOfBirth : '',
    phoneNumber: user && user.phoneNumber ? user.phoneNumber : '',
    address: user && user.address ? user.address : '',
  }),
  enableReinitialize: true,
  validationSchema: yup.object().shape({
    name: yup.string().max(30).required('Name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
  }),
  handleSubmit: async (values, { props }) => {
    const { user } = props;
  
    // Tạo một đối tượng mới từ đối tượng user và chỉ cập nhật các thuộc tính cần thiết
    const updatedUser = {
      ...user,
      _fullName: values.name || user.fullName,
      _dateOfBirth: values.dateOfBirth || user.dateOfBirth,
      _address: values.address || user.address,
      _avatar: values.imageUri || user.avatar,
      _phoneNumber: values.phoneNumber || user.phoneNumber,
    };
  
    try {
      await UserController.uploadUser(updatedUser, (updatedUser) => {
        console.log('User updated successfully!');
      }, { updating: true });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }  
})(ProfileForm);