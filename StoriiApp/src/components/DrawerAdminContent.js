import React, { useState, useContext, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { View, Text, Linking, Pressable, Alert, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../global/styles'
import UserController from '../backend/controllers/UserController'

import { SignInContext } from '../contexts/authContext'


export default function DrawerAdminContent(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const { dispatchSignedIn } = useContext(SignInContext)
  const navigation = useNavigation()

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const response = await UserController.getCurrentUser();
    if (response.success) {
      setCurrentUser(response.user);
    } else {
      console.log(response.message);
    }
  };

  async function signOut() {
    try {
      await auth().signOut();
      console.log("Đăng xuất thành công");
      dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } });
      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
    } catch (error) {
      Alert.alert(error.code);
    }
  }

  // Tạo giao diện điều hướng
  return (
    <View style={styles.container}>
      {/* Tạo ScrollView cho thanh điều hướng */}
      <DrawerContentScrollView {...props}>
        {/* User Info */}
        {currentUser ? (
          <View style={{ backgroundColor: colors.buttons }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                paddingVertical: 10
              }}
            >
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={75}
                source={{ uri: currentUser?.avatar }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>{currentUser?.fullName}</Text>
                <Text style={{ color: colors.cardbackground, fontSize: 14 }}>{currentUser?.email}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>
              <View style={{ flexDirection: 'row', marginTop: 0 }}>
                <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>1</Text>
                  <Text style={{ color: colors.cardbackground, fontSize: 14 }}>My Favorites</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 0 }}>
                <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>0</Text>
                  <Text style={{ color: colors.cardbackground, fontSize: 14 }}>My Cart</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Loading...</Text>
          </View>
        )}
        {/* Hiển thị danh sách các mục trong thanh điều hướng */}
        <DrawerItemList {...props} />
        {/* Tạo mục trong thanh điều hướng */}
        <DrawerItem
          label="Payment"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="credit-card-outline"
              color={color}
              size={size}
            />
          )}
        />
        <DrawerItem
          label="Promotions"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="tag-heart"
              color={color}
              size={size}
            />
          )}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="cog-outline"
              color={color}
              size={size}
            />
          )}
        />
        <DrawerItem
          label="Help"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="lifebuoy"
              color={color}
              size={size}
            />
          )}
        />
        {/* Dark mode */}
        <View style={{ borderTopWidth: 1, borderTopColor: colors.grey5 }}>
          <Text style={styles.preferences}>Preferences</Text>
          <View style={styles.switchText}>
            <Text style={styles.darkthemeText}>Dark Theme</Text>
            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor="#f4f3f4"
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Sign Out"
        icon={({ color, size }) => (
          <Icon
            type="material-community"
            name="logout-variant"
            color={color}
            size={size}
            onPress={() => { signOut() }}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    borderWidth: 4,
    borderColor: colors.primary_light
  },
  preferences: {
    fontSize: 16,
    color: colors.primary_bold,
    paddingTop: 10,
    paddingLeft: 20,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10
  },
  darkthemeText: {
    fontSize: 16,
    color: colors.primary_normal,
    paddingTop: 10,
    paddingLeft: 0,
    fontWeight: "bold"
  }
})