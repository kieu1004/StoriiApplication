import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Divider } from 'react-native-elements'

const AccountScreen = () => {
    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>

                <View style={styles.profilePicContainer}>
                    <Image
                        source={require('../../assets/user.jpg')}
                        style={styles.profilePic}
                    />
                </View>

                <View style={styles.headerInfo}>
                    <Text style={styles.name}>Ha Anh Tuan</Text>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Icon type="ionicon"
                            name="pencil" size={20} color="gray" />
                        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <Divider style={styles.divider} />


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Email:</Text>
                    <Text style={styles.infoValue}>hatsaigon.com</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Phone:</Text>
                    <Text style={styles.infoValue}>0123456789</Text>
                </View>
            </View>


            <Divider style={styles.divider} />


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Street:</Text>
                    <Text style={styles.infoValue}>86 Au Co St</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>City:</Text>
                    <Text style={styles.infoValue}>Ho Chi Minh</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>State:</Text>
                    <Text style={styles.infoValue}>Tan</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoTitle}>Zip Code:</Text>
                    <Text style={styles.infoValue}>10001</Text>
                </View>
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editProfileButtonText: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 5,
    },
    divider: {
        marginVertical: 20,
        backgroundColor: 'gray',
        marginBottom: 20
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoTitle: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    infoValue: {
        fontSize: 16,
    },
});

export default AccountScreen;