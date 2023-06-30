import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from "../global/styles";
import { Icon } from 'react-native-elements'
import SearchComponent from '../components/SearchComponent';
import FoodController from '../backend/controllers/FoodController';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const cardWidth = SCREEN_WIDTH / 2 - 20;

export default function SearchScreen() {
    const navigation = useNavigation();
    const [foodList, setFoodList] = useState([]);

    const loadFoodList = async () => {
        try {
            const foods = await FoodController.getFoodList();
            setFoodList(foods);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await loadFoodList();
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <SearchComponent />

            <View style={styles.content}>
                <FlatList
                    data={foodList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            underlayColor={colors.cardbackground}
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate("DetailScreen", { item: item.name });
                            }}
                        >
                            <View style={styles.cardProduct}>
                                <View style={{ alignItems: 'center', marginTop: 20 }}>
                                    <Image source={{ uri: item._img }} style={{ height: 100, width: 120 }} />
                                </View>
                                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 10,
                                        flex: 1,
                                        marginHorizontal: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: "flex-end",
                                        marginBottom: 15
                                    }}
                                >
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.primary_bold }}>
                                        {item.price}
                                    </Text>


                                    <View style={styles.addToCart}>
                                        <Icon name="add" size={20} color={colors.cardbackground} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={<Text style={styles.listHeader}>Best choice</Text>}
                    ListFooterComponent={<Footer />}
                />
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        paddingTop: 20,
    },
    content: {
        marginTop: 10,
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
    addToCart: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: colors.primary_bold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageView: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
        marginLeft: SCREEN_WIDTH * 0.035,
        marginBottom: SCREEN_WIDTH * 0.035,
    },
    image: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        borderRadius: 10,
    },
    textView: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
    },
    text: {
        color: colors.cardbackground,
    },
    listHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary_bold,
        paddingBottom: 10,
        marginLeft: 12,
    },
});

const Footer = () => {
    const navigation = useNavigation();
    const [foodList, setFoodList] = useState([]);

    const loadFoodList = async () => {
        try {
            const foods = await FoodController.getFoodList();
            setFoodList(foods);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await loadFoodList();
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.footerContainer}>
            <FlatList
                style={styles.footerList}
                data={foodList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate("DetailScreen", { item: item._name })}
                    >
                        <View style={styles.cardProduct}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item._img }} style={styles.productImage} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.productName}>{item._name}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>{item._price}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={<Text style={styles.listHeader}>More categories</Text>}
            />
        </View>
    );
};

export const footerStyles = StyleSheet.create({
    footerContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    footerList: {
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    productImage: {
        height: 100,
        width: 120,
    },
    textContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    productName: {
        fontSize: 15,
        fontWeight: "bold",
    },
    priceContainer: {
        marginTop: 10,
        flex: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "flex-end",
        marginBottom: 15,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.primary_bold,
    },
});