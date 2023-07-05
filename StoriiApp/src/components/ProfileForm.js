import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserController from '../backend/controllers/UserController';
import CurryImagePicker from '../components/CurryImagePicker';
import { colors } from '../global/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryButton } from './Button';

const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const { success, user } = await UserController.getCurrentUser();
    if (success) {
      setUser(user);
      setFullName(user.fullName);
      setDateOfBirth(user.dateOfBirth);
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);
    }
  };

  const saveProfile = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        _fullName: fullName,
        _dateOfBirth: dateOfBirth,
        _address: address,
        _phoneNumber: phoneNumber
      };

      const imageUrl = await uploadImage(selectedImage);
      updatedUser._avatar = imageUrl || updatedUser._avatar;

      await UserController.updateUser(updatedUser, (updatedUser) => {
        console.log('User updated:', updatedUser);
      });
    }
  };


  const uploadImage = async (imageUri) => {
    try {
      // Implement your image upload logic here and return the image URL
      // For example:
      const imageUrl = await UserController.uploadImage(imageUri);
      return imageUrl;
    } catch (error) {
      console.log('Error uploading image:', error);
      return null;
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

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      setDateOfBirth(formattedDate);
    }
  };

  const handleImagePicked = async (pickedImage) => {
    try {
      const imageUrl = await uploadImage(pickedImage.uri);
      if (imageUrl) {
        setSelectedImage(imageUrl);
        setUser((prevUser) => ({
          ...prevUser,
          _avatar: imageUrl
        }));
      } else {
        console.log('Failed to upload image');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>
        <CurryImagePicker image={selectedImage} onImagePicked={handleImagePicked} />

        <Text style={styles.inputTitle}>Full Name</Text>
        <TextInput value={fullName} onChangeText={setFullName} />

        <TouchableOpacity style={styles.inputContainer} onPress={showDatePickerModal}>
          <Text style={styles.inputTitle}>Date Of Birth</Text>
          <Text>{dateOfBirth || 'Chọn ngày sinh'}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.inputTitle}>Phone Number</Text>
        <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />

        <Text style={styles.inputTitle}>Address</Text>
        <TextInput value={address} onChangeText={setAddress} />
      </ScrollView>

      <View style={styles.btnSubmit}>
        <PrimaryButton title="Save Profile" onPress={saveProfile} />
      </View>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
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