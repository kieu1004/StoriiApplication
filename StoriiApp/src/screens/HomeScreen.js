import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, parameters } from '../global/styles'
import { Countdown } from 'react-native-countdown-component'

import HomeHeader from "../components/HomeHeader"
import { filterData, providerData } from '../global/Data'
import ProductCard from "../components/ProductCard"



const SCREEN_WIDTH = Dimensions.get('window').width

export default function HomeScreen() {

    const [delivery, setDelivery] = useState(true)
    const [indexCheck, setIndexCheck] = useState("0")
    return (
        <View style={styles.container}>
            <HomeHeader />

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}>

                <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 5 }}>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(true)
                            }}>
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.primary_bold : colors.primary_light }}>
                                <Text style={styles.deliveryText}>Delivery</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(false)
                            }}>
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.primary_normal : colors.primary_light }}>
                                <Text style={styles.deliveryText}>Pick Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.filterView}>
                    <View style={styles.addressView}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                            <Icon
                                type="material-community"
                                name="map-marker"
                                color={colors.primary_bold}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>86 Au Co</Text>
                        </View>

                        <View style={styles.clockView}>
                            <Icon
                                type="material-community"
                                name="clock-time-four"
                                color={colors.primary_bold}
                                size={26}
                            />

                            <Text style={{ marginLeft: 5 }}>Now</Text>
                        </View>
                    </View>

                    <View>
                        <Icon
                            type="material-community"
                            name="tune"
                            color={colors.primary_bold}
                            size={26}
                        />
                    </View>

                </View>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Categories</Text>
                </View>

                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={filterData}
                        keyExtractor={(item) => item.id}
                        extraData={indexCheck}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => { setIndexCheck(item.id) }}
                            >
                                <View style={indexCheck === item.id ? { ...styles.smallCardSelected } : { ...styles.smallCard }}>
                                    <Image
                                        style={{ height: 60, width: 60, borderRadius: 30 }}
                                        source={item.image}
                                    />
                                    <View>
                                        <Text style={indexCheck === item.id ? { ...styles.smallCardTextSelected } : { ...styles.smallCardText }}>{item.name}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Free Delivery Now</Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 15, fontSize: 16, marginTop: -10, marginRight: 5 }}>Options changing in</Text>
                        {/* <Countdown
                            until = {3600}
                            size = {14}
                            digitStyle = {{backgroundColor:colors.banner_sale}}
                            digitTxtStyle = {{color:colors.cardbackground}}
                            timeToShow = {['M', 'S']}
                            timeLabels = {{m:'Min', s:'Sec'}}
                        /> */}
                    </View>

                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={providerData}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({ item }) => (
                            <View style={{ marginRight: 5 }}>
                                <ProductCard
                                    screenWidth={SCREEN_WIDTH * 0.8}
                                    images={item.images}
                                    providerName={item.providerName}
                                    farAway={item.farAway}
                                    businessAddress={item.businessAddress}
                                    averageReview={item.averageReview}
                                />
                            </View>
                        )}
                    />
                </View>


                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Promotion available</Text>
                </View>

                <View>
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={providerData}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({ item }) => (
                            <View style={{ marginRight: 5 }}>
                                <ProductCard
                                    screenWidth={SCREEN_WIDTH * 0.8}
                                    images={item.images}
                                    providerName={item.providerName}
                                    farAway={item.farAway}
                                    businessAddress={item.businessAddress}
                                    averageReview={item.averageReview}
                                />
                            </View>
                        )}
                    />
                </View>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Provider in your area</Text>
                </View>

                <View style={{ width: SCREEN_WIDTH, paddingTop: 10 }}>
                    {
                        providerData.map(item => (
                            <View key={item.id} style={{ paddingBottom: 20 }}>
                                <ProductCard
                                    screenWidth={SCREEN_WIDTH * 0.95}
                                    images={item.images}
                                    providerName={item.providerName}
                                    farAway={item.farAway}
                                    businessAddress={item.businessAddress}
                                    averageReview={item.averageReview}
                                />
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5
    },

    deliveryText: {
        marginLeft: 5,
        fontSize: 16,
    },

    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 10
    },

    addressView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.primary_light,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 3
    },

    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: colors.primary_light,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginRight: 20
    },

    headerText: {
        color: colors.primary_bold,
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 10
    },

    headerTextView: {
        backgroundColor: colors.primary_light,
        paddingVertical: 2,
    },

    smallCard: {
        borderRadius: 30,
        backgroundColor: colors.cardbackground,
        borderColor: colors.primary_light,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },

    smallCardSelected: {
        borderRadius: 30,
        backgroundColor: colors.primary_light,
        borderColor: colors.primary_light,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        margin: 10,
        height: 100
    },

    smallCardText: {
        fontWeight: "400",
        color: colors.primary_bold,
        fontSize: 10
    },

    smallCardTextSelected: {
        fontWeight: "bold",
        color: colors.cardbackground,
        fontSize: 10
    }
})