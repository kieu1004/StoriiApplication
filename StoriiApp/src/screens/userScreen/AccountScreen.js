import React, { useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { colors } from '../../global/styles';
import UserController from '../../backend/controllers/UserController';
import { SignInContext } from '../../contexts/authContext';

const AccountScreen = ({navigation}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { dispatchSignedIn } = useContext(SignInContext)

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
        setLoading(false);
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
            ToastAndroid.show('Đăng xuất thành công!', ToastAndroid.SHORT);
        } catch (error) {
            Alert.alert('Error', error.message);
            console.log("Đăng xuất thất bại:", error);
        }
    }


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {currentUser ? (
                <>
                    <View style={styles.header}>
                        <View style={styles.profilePicContainer}>
                            <Image source={{ uri: currentUser?.avatar }} style={styles.profilePic} />
                        </View>
                        <View style={styles.headerInfo}>
                            <Text style={styles.name}>{currentUser?.fullName}</Text>
                            <TouchableOpacity style={styles.editProfileButton}>
                                <Icon name="pencil" size={20} color={colors.text_fuzz3} />
                                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Personal Information</Text>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Icon name="calendar" size={20} color="black" />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoLabel}>Date of birth:</Text>
                                <Text style={styles.infoValue}>{currentUser?.dateOfBirth}</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Icon name="mail" size={20} color="black" />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoLabel}>Email:</Text>
                                <Text style={styles.infoValue}>{currentUser?.email}</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Icon name="call" size={20} color="black" />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoLabel}>Phone:</Text>
                                <Text style={styles.infoValue}>{currentUser?.phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Icon name="location" size={20} color="black" />
                            </View>
                            <View style={styles.infoText}>
                                <Text style={styles.infoLabel}>Address:</Text>
                                <Text style={styles.infoValue}>{currentUser?.address}</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    <View style={styles.section}>
                        <TouchableOpacity style={styles.supportButton}>
                            <Icon name="headset-outline" size={20} color={colors.text_fuzz3} />
                            <Text style={styles.supportButtonText}>Support Center</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                            <Icon name="log-out-outline" size={20} color={colors.text_fuzz3} />
                            <Text style={styles.logoutButtonText}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>No user data available.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.banner_sale,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: 30,
    },
    profilePicContainer: {
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.text_white,
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editProfileButtonText: {
        fontSize: 16,
        color: colors.text_fuzz3,
        marginLeft: 5,
    },
    divider: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'gray',
    },
    section: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoIcon: {
        marginRight: 10,
    },
    infoText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: 'black',
        marginRight: 5,
    },
    infoValue: {
        fontSize: 16,
        color: 'gray',
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    supportButtonText: {
        fontSize: 16,
        color: colors.text_fuzz3,
        marginLeft: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 16,
        color: colors.text_fuzz3,
        marginLeft: 5,
    },
});

export default AccountScreen;