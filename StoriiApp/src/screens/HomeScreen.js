import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions, StatusBar } from 'react-native'
import { TouchableHighlight } from "react-native-gesture-handler"
import { Icon } from 'react-native-elements'
import { colors, fonts, parameters } from '../global/styles'
import Countdown from 'react-native-countdown-component'

import HomeHeader from "../components/HomeHeader"
import { filterData, providerData, productData } from '../global/Data'
import FoodCard from "../components/FoodCard"
import ProductCard from "../components/ProductCard"



const SCREEN_WIDTH = Dimensions.get('window').width
// const { width } = Dimensions.get('screen')
const cardWidth = SCREEN_WIDTH / 2 - 20;

const HomeScreen = ({ navigation }) => {

    const [delivery, setDelivery] = useState(true)
    const [indexCheck, setIndexCheck] = useState("0")





    const Card = ({ productData}) => {
        return (
            <TouchableHighlight
                underlayColor={colors.cardbackground}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('DetailsScreen', productData)}>
                <View style={styles.cardProduct}>
                    <View style={{ alignItems: 'center', marginTop:20 }}>
                        <Image source={{ uri: productData.image }} style={{ height: 100, width: 120 }} />
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight:"bold"}}>{productData.name}</Text>
                    </View>
                    <View
                        style={{
                            marginTop:10,
                            flex:1,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems:"flex-end",
                            marginBottom: 15
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color:colors.primary_bold }}>
                            $ {productData.price}
                        </Text>
                        <View style={styles.addToCartBtn}>
                            <Icon name="add" size={20} color={colors.cardbackground} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }






    return (
        <View style={styles.container}>


            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="rgb(234, 221, 202)"
            />


            <HomeHeader navigation={navigation} />


            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}>

                <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 5 }}>
                    <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(true)
                            }}>
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.cardSelected : colors.primary_normal }}>
                                <Text style={styles.deliveryText}>Delivery</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(false)
                            }}>
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.primary_normal : colors.cardSelected }}>
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


                <View style={{ marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 15, fontSize: 16, marginTop: -10, marginRight: 5 }}>Options changing in</Text>
                        <Countdown
                            until={3600}
                            size={14}
                            digitStyle={{ backgroundColor: colors.banner_sale }}
                            digitTxtStyle={{ color: colors.cardbackground }}
                            timeToShow={['M', 'S']}
                            timeLabels={{ m: 'Min', s: 'Sec' }}
                        />
                    </View>

                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={providerData}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({ item }) => (
                            <View style={{ marginRight: 5 }}>
                                <FoodCard
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
                    <Text style={styles.headerText}>In your area</Text>
                </View>


                <View style={{ width: SCREEN_WIDTH, paddingTop: 10 }}>
                    {
                        providerData.map(item => (
                            <View key={item.id} style={{ paddingBottom: 20 }}>
                                <FoodCard
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

                <View style={{alignItems:"center", marginTop:20}}>
                    <Text style={styles.headerText}>Best for you</Text>
                </View>

                <View style={styles.listProduct} >
                    <View style={{ flex: 1 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={productData}
                            renderItem={({ item }) => <Card productData={item} />}
                        />
                    </View>
                </View>

            </ScrollView>







            {delivery &&
                <View style={styles.floatButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProviderMapScreen')
                        }}
                    >

                        <Icon
                            name="place"
                            type="material"
                            size={32}
                            color={colors.buttons}
                        />

                        <Text style={{ color: colors.primary_normal }}>Map</Text>
                    </TouchableOpacity>
                </View>
            }


        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },

    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5
    },

    deliveryText: {
        marginLeft: 5,
        fontSize: 16,
        color: colors.headerText
    },

    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: colors.background,
        marginBottom: 5
    },

    addressView: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 3
    },

    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: colors.background,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginRight: 20
    },

    headerText: {
        color: colors.primary_bold,
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10
    },

    headerTextView: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: colors.primary_backgroud,
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
        backgroundColor: colors.cardSelected,
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
    },

    floatButton: {
        position: 'absolute',
        bottom: 10, right: 15,
        backgroundColor: 'white',
        elevation: 10,
        width: 60, height: 60,
        borderRadius: 30,
        alignItems: 'center'
    },

    listProduct: {
        flex: 1,
        width: SCREEN_WIDTH,
    },

    cardProduct: {
        height: 250,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: colors.cardbackground,
    },

    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: colors.primary_bold,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default HomeScreen