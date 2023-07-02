import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import { Icon, ArrowLeftIcon } from 'react-native-elements'
import { colors, parameters, fonts } from "../../global/styles"
import AdminHeader from "../../components/AdminHeader"
import UserController from "../../backend/controllers/UserController"

const AdminDashboardScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(null);

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

    const handleEditInfo = () => {
        navigation.navigate("EditUserScreen");
    };

    return (
        <View style={styles.container}>
            <AdminHeader navigation={navigation} />

            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: currentUser?.avatar }} style={styles.imgUser} />
                </View>

                <View style={styles.details}>
                    {currentUser ? (
                        <View style={styles.adminInfoContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Admin Information</Text>
                                <TouchableOpacity onPress={handleEditInfo}>
                                    <Text style={styles.editButton}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.infoItem}>
                                <Icon name="person" type="material" style={styles.icon} />
                                <Text style={styles.label}>Full Name:</Text>
                                <Text style={styles.value}> {currentUser.fullName}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Icon name="cake" type="material" style={styles.icon} />
                                <Text style={styles.label}>Date of Birth:</Text>
                                <Text style={styles.value}> {currentUser.dateOfBirth}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Icon name="phone" type="material" style={styles.icon} />
                                <Text style={styles.label}>Phone Number:</Text>
                                <Text style={styles.value}> {currentUser.phoneNumber}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Icon name="email" type="material" style={styles.icon} />
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}> {currentUser.email}</Text>
                            </View>

                            <View style={styles.infoItem}>
                                <Icon name="location-on" type="material" style={styles.icon} />
                                <Text style={styles.label}>Address:</Text>
                                <Text style={styles.value}> {currentUser.address}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Loading...</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.banner_sale,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imgUser: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    details: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    adminInfoContainer: {
        flex: 1,
        paddingHorizontal: 35,
        marginTop: 40
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    editButton: {
        fontSize: 16,
        color: colors.primary_normal,
        fontWeight: 'bold',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        flex: 1,
        color:colors.text_fuzz3
    },
})

export default AdminDashboardScreen