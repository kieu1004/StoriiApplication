import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import { Formik } from 'formik'
import { Icon } from 'react-native-elements'
import { colors } from '../../global/styles'
import { PrimaryButton } from '../../components/Button'
import UserController from '../../backend/controllers/UserController'

const EditUserScreen = () => {
  const initialValues = {
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
  }

  const editUser = async (values) => {
    try {
      const user = {
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth,
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: values.address,
        role: 'admin',
      }

      const response = await UserController.updateUser(user)
      console.log('User updated successfully:', response)
    } catch (error) {
      console.log('Error updating user:', error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.details}>
        <View style={styles.view1}>
          <Text style={styles.text1}>Admin Information</Text>
        </View>

        <Formik initialValues={initialValues} onSubmit={editUser}>
          {(props) => (
            <View style={styles.view2}>
              <View style={styles.view6}>
                <TextInput
                  placeholder="Full Name"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange('fullName')}
                  value={props.values.fullName}
                />
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Date Of Birth"
                  style={styles.input1}
                  keyboardType="numeric"
                  autoFocus={true}
                  onChangeText={props.handleChange('dateOfBirth')}
                  value={props.values.dateOfBirth}
                />
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Mobile Number"
                  style={styles.input1}
                  keyboardType="number-pad"
                  autoFocus={true}
                  onChangeText={props.handleChange('phoneNumber')}
                  value={props.values.phoneNumber}
                />
              </View>

              <View style={styles.view10}>
                <View>
                  <Icon
                    name="person"
                    style={styles.email}
                    color={colors.text_fuzz3}
                    type="material"
                  />
                </View>
                <View style={styles.view11}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input4}
                    autoFocus={false}
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                  />
                </View>
              </View>

              <View style={styles.view6}>
                <TextInput
                  placeholder="Address"
                  style={styles.input1}
                  autoFocus={true}
                  onChangeText={props.handleChange('address')}
                  value={props.values.address}
                />
              </View>

              <View style={styles.view17}>
                <PrimaryButton title="Update" onPress={props.handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  details: {
    paddingHorizontal: 20,
    paddingBottom: '100%',
    backgroundColor: colors.banner_sale,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  view1: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 28,
    color: colors.primary_normal,
    fontWeight: 'bold',
  },
  view2: {
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  view6: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.text_fuzz3,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  input1: {
    fontSize: 16,
  },
  view10: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.text_fuzz3,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },
  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },
  view11: {
    marginLeft: 30,
    maxWidth: '65%',
  },
  input4: {
    fontSize: 16,
    marginLeft: -20,
    marginBottom: -10,
  },
  view17: {
    marginVertical: 10,
    marginTop: 15,
  },
})

export default EditUserScreen