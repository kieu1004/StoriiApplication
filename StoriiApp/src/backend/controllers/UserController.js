import UserModel from '../models/UserModel';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

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

  static async updateUser(user, updateComplete) {
    try {
      user.updatedAt = firebase.database.ServerValue.TIMESTAMP;
      await firebase.database()
        .ref(`Users/${user.id}`)
        .update(user);
      updateComplete(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }


  static async uploadUser(user, onUserUploaded) {
    try {
      if (user.imageUri) {
        const fileExtension = user.imageUri.split('.').pop();
        const uuid = uuidv4();
        const fileName = `${uuid}.${fileExtension}`;
        const storageRef = firebase.storage().ref(`Users/images/${fileName}`);

        const uploadTask = storageRef.putFile(user.imageUri);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);

            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log('Upload success');
            }
          },
          (error) => {
            console.log(`Image upload error: ${error}`);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL()
              .then((downloadUrl) => {
                console.log(`File available at: ${downloadUrl}`);

                user.img = downloadUrl;
                delete user.imageUri;

                console.log('Updating...');
                UserController.updateUser(user, onUserUploaded);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      } else {
        console.log('Skipping image upload');
        delete user.imageUri;

        console.log('Updating...');
        UserController.updateUser(user, onUserUploaded);
      }
    } catch (error) {
      console.error('Error uploading user:', error);
      throw error;
    }
  }

  static uploadImage = async (image) => {
    try {
      if (image == null) {
        return null;
      }

      const fileExtension = image.split('.').pop();
      const uuid = uuidv4();
      const fileName = `${uuid}.${fileExtension}`;
      const storageRef = firebase.storage().ref(`Photos/${fileName}`);

      const uploadTask = storageRef.putFile(image);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log('Upload success');
          }
        },
        (error) => {
          console.log(`Image upload error: ${error}`);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then((downloadUrl) => {
              console.log(`File available at: ${downloadUrl}`);
              return downloadUrl;
            })
            .catch((error) => {
              console.log(error);
              return null;
            });
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
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