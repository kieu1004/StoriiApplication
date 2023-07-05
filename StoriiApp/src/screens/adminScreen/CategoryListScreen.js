import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, FlatList, SafeAreaView, Text, View, Image } from 'react-native';
import CategoryController from '../../backend/controllers/CategoryController';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { colors } from '../../global/styles';
import SearchAdminCategory from '../../components/SearchAdminCategory';

const CategoryList = ({ navigation }) => {
    const [categoryList, setCategoryList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const loadCategoryList = async () => {
        try {
            const categories = await CategoryController.getCategoryList();
            setCategoryList(categories);
            return categories;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await loadCategoryList();
                console.log(result); // Log the categories data
            } catch (error) {
                console.log(error); // Log any errors that occurred
            }
        };

        loadData();
    }, []);

    const onCategoryAdded = (category) => {
        setCategoryList((prevCategoryList) => [...prevCategoryList, category]);
        navigation.popToTop();
    };

    const onCategoryDeleted = () => {
        const newCategoryList = [...categoryList];
        newCategoryList.splice(selectedIndex, 1);
        setCategoryList(newCategoryList);
        navigation.popToTop();
    };

    const navigateToCategoryForm = () => {
        navigation.navigate('CategoryForm', { categoryAddedCallback: onCategoryAdded });
    };

    const navigateToCategoryDetail = (item, index) => {
        setSelectedIndex(index);
        navigation.navigate('CategoryDetail', { category: item, categoryDeletedCallback: onCategoryDeleted });
    };

    const renderEmptyState = () => (
        <View style={styles.textContainer}>
            <Text style={styles.emptyTitle}>No Categories found</Text>
            <Text style={styles.emptySubtitle}>Add a new category using the + button below</Text>
            {renderActionButton()}
        </View>
    );

    const renderActionButton = () => (
        <ActionButton buttonColor={colors.primary_normal} onPress={navigateToCategoryForm} />
    );

    const renderItem = ({ item }) => {
        return (
            <ListItem
                containerStyle={styles.listItem}
                onPress={() => navigateToCategoryDetail(item, categoryList.indexOf(item))}
            >
                <Image source={{ uri: item._img }} style={styles.categoryImage} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchAdminCategory/>
            {categoryList.length > 0 ? (
                <FlatList
                    data={categoryList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={Divider}
                />

            ) : (
                renderEmptyState()
            )}
            {renderActionButton()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        marginTop: 15,
        marginBottom: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 30,
    },
    subtitleStyle: {
        fontSize: 18,
    },
    categoryImage:{
        width: 50,
        height: 50
    },
    emptyTitle: {
        fontSize: 32,
        marginBottom: 16,
    },
    emptySubtitle: {
        fontSize: 18,
        fontStyle: 'italic',
    },
});

export default CategoryList;