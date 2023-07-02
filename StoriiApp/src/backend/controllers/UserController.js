import UserModel from '../models/UserModel';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class UserController {
  static loginUser = async (email, password) => {
    try {
      // Đăng nhập qua Authentication
      const authResponse = await auth().signInWithEmailAndPassword(email, password);
      const uid = authResponse.user.uid;

      // Lấy thông tin người dùng từ Realtime Database
      const snapshot = await database().ref('Users').orderByChild('_email').equalTo(email).once('value');
      const userData = snapshot.val();

      if (userData) {
        const userId = Object.keys(userData)[0]; // Lấy khóa người dùng đầu tiên trong danh sách kết quả truy vấn từ Realtime Database
        const user = new UserModel(
          userData[userId]._email,
          userData[userId]._password,
          userData[userId]._role,
          userData[userId]._fullName,
          userData[userId]._dateOfBirth,
          userData[userId]._address,
          userData[userId]._avatar,
          userData[userId]._phoneNumber,
          userId,
          userData[userId].cart
        );

        return { success: true, user };
      } else {
        return { success: false, message: 'Tài khoản không tồn tại' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static registerUser = async (user) => {
    try {
      const { email, password, role, fullName, dateOfBirth, address, avatar, phoneNumber } = user;
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const cart = [];
      const userData = new UserModel(email, password, role, fullName, dateOfBirth, address, avatar, phoneNumber, uid, cart);
      await database().ref('Users').child(uid).set(userData);
      return { success: true, message: 'Đăng ký thành công' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static logoutUser = async () => {
    try {
      await auth().signOut();
      return { success: true, message: 'Đăng xuất thành công' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static getUsers = async () => {
    try {
      const snapshot = await database().ref('Users').once('value');
      const usersData = snapshot.val();
      const users = [];
      for (const uid in usersData) {
        if (usersData.hasOwnProperty(uid)) {
          const userData = usersData[uid];
          const user = new UserModel(
            userData._email,
            userData._password,
            userData._role,
            userData._fullName,
            userData._dateOfBirth,
            userData._address,
            userData._avatar,
            userData._phoneNumber,
            uid,
            userData.cart
          );
          users.push(user);
        }
      }
      return { success: true, users };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static getUser = async (userId) => {
    try {
      const snapshot = await database().ref('Users').child(userId).once('value');
      const userData = snapshot.val();
      if (userData) {
        const user = new UserModel(
          userData._email,
          userData._password,
          userData._role,
          userData._fullName,
          userData._dateOfBirth,
          userData._address,
          userData._avatar,
          userData._phoneNumber,
          userId,
          userData.cart
        );
        return { success: true, user };
      } else {
        return { success: false, message: 'Người dùng không tồn tại' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static updateUser = async (userId, updatedUser) => {
    try {
      await database().ref('Users').child(userId).update(updatedUser);
      return { success: true, message: 'Cập nhật người dùng thành công' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  static deleteUser = async (userId) => {
    try {
      await database().ref('Users').child(userId).remove();
      return { success: true, message: 'Xóa người dùng thành công' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Phương thức lấy thông tin người dùng hiện tại
  static getCurrentUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const snapshot = await database().ref('Users').child(uid).once('value');
        const userData = snapshot.val();
        if (userData) {
          const user = new UserModel(
            userData._email,
            userData._password,
            userData._role,
            userData._fullName,
            userData._dateOfBirth,
            userData._address,
            userData._avatar,
            userData._phoneNumber,
            uid,
            userData.cart
          );
          return { success: true, user };
        } else {
          return { success: false, message: 'Không tìm thấy thông tin người dùng' };
        }
      } else {
        return { success: false, message: 'Người dùng chưa đăng nhập' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

export default UserController;