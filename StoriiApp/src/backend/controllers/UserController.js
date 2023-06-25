import UserModel from '../models/UserModel'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'







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
                    userId
                );

                return { success: true, user };
            } else {
                return { success: false, message: 'Tài khoản không tồn tại' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };




    // Phương thức đăng ký realtime database
    static registerUser = async (user) => {
        try {
            const { email, password, role, fullName, dateOfBirth, address, avatar, phoneNumber } = user;
            const response = await auth().createUserWithEmailAndPassword(email, password);
            const uid = response.user.uid;
            const userData = new UserModel(email, password, role, fullName, dateOfBirth, address, avatar, phoneNumber, uid);
            await database().ref('Users').child(uid).set(userData);
            return { success: true, message: 'Đăng ký thành công' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Phương thức đăng xuất
    static logoutUser = async () => {
        try {
            await auth().signOut();
            return { success: true, message: 'Đăng xuất thành công' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Phương thức lấy danh sách người dùng
    static getUsers = async () => {
        try {
            const snapshot = await database().ref('Users').once('value');
            const usersData = snapshot.val();
            const users = [];
            for (const uid in usersData) {
                if (usersData.hasOwnProperty(uid)) {
                    const userData = usersData[uid];
                    const user = new UserModel(userData.email, userData.password, userData.role, userData.fullName, userData.dateOfBirth, userData.address, userData.avatar, userData.phoneNumber, uid);
                    users.push(user);
                }
            }
            return { success: true, users };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };



    // Phương thức lấy ra một người dùng theo id
    static getUser(userId) {
        return database()
            .ref(`/Users/${userId}`)
            .once('value')
            .then((snapshot) => {
                const user = snapshot.val();
                return new UserModel(
                    user.email,
                    user.password,
                    user.role,
                    user.fullName,
                    user.dateOfBirth,
                    user.address,
                    user.avatar,
                    user.phoneNumber,
                    user.id
                );
            });
    }

    //Phương thức thêm người dùng mới
    static createUser(user) {
        const userRef = database().ref(`/User/${user.id}`);
        return userRef.set(user);
    }

    //Phương thức cập nhật người dùng mới
    static updateUser(userId, updatedUser) {
        const userRef = database().ref(`/Users/${userId}`);
        return userRef.update(updatedUser);
    }

    //Phương thức xóa người dùng
    static deleteUser(userId) {
        const userRef = database().ref(`/Users/${userId}`);
        return userRef.remove();
    }
}

export default UserController;