import React, { Component } from 'react';
import { StyleSheet, Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import CategoryController from '../../backend/controllers/CategoryController';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

class CategoryList extends Component {
    state = {
        categoryList: [],
        selectedIndex: 0
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    loadCategoryList = () => {
        CategoryController.getCategoryList(this.onCategoriesReceived);
    }

    onCategoryAdded = (category) => {
        this.setState(prevState => ({
            categoryList: [...prevState.categoryList, category]
        }));
        this.props.navigation.popToTop();
    }

    onCategoryDeleted = () => {
        const { selectedIndex, categoryList } = this.state;
        const newCategoryList = [...categoryList];
        newCategoryList.splice(selectedIndex, 1);

        this.setState({
            categoryList: newCategoryList
        });

        this.props.navigation.popToTop();
    }

    onCategoriesReceived = (categoryList) => {
        this.setState({
            categoryList: categoryList
        });
    }

    navigateToCategoryForm = () => {
        this.props.navigation.navigate('CategoryForm', { categoryAddedCallback: this.onCategoryAdded });
    }

    navigateToCategoryDetail = (item, index) => {
        this.setState({ selectedIndex: index });
        this.props.navigation.navigate('CategoryDetail', { category: item, categoryDeletedCallback: this.onCategoryDeleted });
    }

    renderEmptyState = () => (
        <View style={styles.textContainer}>
            <Text style={styles.emptyTitle}>No Categorys found</Text>
            <Text style={styles.emptySubtitle}>Add a new category using the + button below</Text>
            {this.renderActionButton()}
        </View>
    );

    renderActionButton = () => (
        <ActionButton
            buttonColor='blue'
            onPress={this.navigateToCategoryForm}
        />
    );

    render() {
        const { categoryList } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                {categoryList.length > 0 ? (
                    <FlatList
                        data={categoryList}
                        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <ListItem
                                containerStyle={styles.listItem}
                                title={item.name}
                                titleStyle={styles.titleStyle}
                                subtitleStyle={styles.subtitleStyle}
                                leftAvatar={{
                                    size: 'large',
                                    rounded: false,
                                    source: item.image && { uri: item.image }
                                }}
                                onPress={() => this.navigateToCategoryDetail(item, index)}
                            />
                        )}
                    />
                ) : this.renderEmptyState()}
                {this.renderActionButton()}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        marginTop: 8,
        marginBottom: 8
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 30
    },
    subtitleStyle: {
        fontSize: 18
    },
    emptyTitle: {
        fontSize: 32,
        marginBottom: 16
    },
    emptySubtitle: {
        fontSize: 18,
        fontStyle: 'italic'
    }
});

export default CategoryList;