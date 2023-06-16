import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Linking, Pressable, Alert, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Button, Icon } from 'react-native-elements'
import { colors } from '../global/styles'





export default function DrawerContent(props) {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>

                
                <View style={{ backgroundColor: colors.buttons }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 10 }}>
                        <Avatar
                            rounded
                            avatarStyle={styles.avatar}
                            size={75}
                            source={{ uri: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/345922544_767818595019884_114742103876237789_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=wgnoDsK_9ZAAX_g60DS&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfAIG5jLGUSgTkxOLRmOS9JkxsiRGaIgm5-_EK55Ag1arw&oe=648DB988" }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }} >Ha Anh Tuan</Text>
                            <Text style={{ color: colors.cardbackground, fontSize: 14 }} > hatsaigon@gmail.com</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", paddingBottom: 5 }}>
                        <View style={{ flexDirection: 'row', marginTop: 0, }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>1</Text>
                                <Text style={{ color: colors.cardbackground, fontSize: 14 }} >My Favorites</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}  >
                                <Text style={{ fontWeight: 'bold', color: colors.cardbackground, fontSize: 18 }}>0</Text>
                                <Text style={{ color: colors.cardbackground, fontSize: 14 }} >My Cart</Text>
                            </View>
                        </View>
                    </View>

                </View>


                <DrawerItemList {...props} />


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
                        onPress={() => {
                            
                        }}
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