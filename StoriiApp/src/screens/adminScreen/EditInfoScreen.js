import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Icon } from 'react-native-elements';
import { colors } from '../../global/styles';
import { PrimaryButton } from '../../components/Button';
import Header from '../../components/Header';
import UserController from '../../backend/controllers/UserController';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditUserScreen = ({navigation}) => {
  const initialValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
  };

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

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const editUser = async (values) => {
    try {
      const user = {
        fullName: values.fullName,
        dateOfBirth: selectedDate.toISOString(),
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: values.address,
        role: 'admin',
      };

      const response = await UserController.updateUser(user);
      console.log('User updated successfully:', response);
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Header type="arrow-left" navigation={navigation} />

      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>
        <View style={styles.view1}>
          <Text style={styles.text1}>Admin Information</Text>
        </View>

        <Formik initialValues={initialValues} onSubmit={editUser}>
          {(props) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  autoFocus={false}
                  onChangeText={props.handleChange('fullName')}
                  value={props.values.fullName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.title}>Date of Birth</Text>
                <TouchableOpacity style={styles.datePicker} onPress={showDatePickerModal}>
                  <Text>
                    {selectedDate ? formatDate(selectedDate) : 'Select your date of birth'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.title}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  autoFocus={true}
                  onChangeText={props.handleChange('phoneNumber')}
                  value={props.values.phoneNumber}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.title}>Email</Text>
                <View style={styles.emailInputContainer}>
                  <TextInput
                    style={styles.emailInput}
                    autoFocus={false}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.title}>Address</Text>
                <TextInput
                  style={styles.input}
                  autoFocus={true}
                  onChangeText={props.handleChange('address')}
                  value={props.values.address}
                />
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton title="Update" onPress={props.handleSubmit} />
              </View>
            </View>
          )}
        </Formik>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  details: {
    paddingHorizontal: 20,
    paddingBottom: "100%",
    backgroundColor: colors.banner_sale,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  view1: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primary_normal
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.text_fuzz3,
    borderRadius: 12,
    paddingLeft: 10,
    height: 48,
    fontSize: 16,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: colors.text_fuzz3,
    borderRadius: 12,
    paddingLeft: 10,
    height: 48,
    justifyContent: 'center',
  },
  emailInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.text_fuzz3,
    borderRadius: 12,
    paddingLeft: 10,
    height: 48,
    alignItems: 'center',
  },
  emailIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  emailInput: {
    fontSize: 16,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default EditUserScreen;
