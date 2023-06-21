import UserModel from '../models/UserModel'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'







class UserController {
    // Phương thức đăng nhập realtime database
    static loginUser = async (email, password) => {
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            const uid = response.user.uid;
            const snapshot = await database().ref('Users').child(uid).once('value');
            const userData = snapshot.val();
            const user = new UserModel(userData.email, userData.password, userData.role, userData.fullName, userData.dateOfBirth, userData.address, userData.avatar, userData.phoneNumber, uid);
            return { success: true, user };
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
            return { success: true, message: 'User registered successfully' };
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