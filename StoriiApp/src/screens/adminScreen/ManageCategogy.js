import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    Modal,
    StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import CategoryController from '../../backend/controllers/CategoryController';
import CategoryModel from '../../backend/models/CategoryModel';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchCategorys();
    }, []);

    const fetchCategorys = async () => {
        try {
            const categories = await CategoryController.getCategoryList();
            setFoods(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSelectImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                includeBase64: true,
            });

            setCategoryImage(`data:${image.mime};base64,${image.data}`);
        } catch (error) {
            console.log('ImagePicker Error:', error);
        }
    };


    const handleAddCategory = async () => {
        if (!categoryName || !categoryImage) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const newCategory = new CategoryModel(
            null,
            categoryName,
            categoryImage,
        );

        try {
            const foodId = await FoodController.addFood(newFood);
            Alert.alert('Thành công', 'Thêm danh ngày sản phẩm thành công');
            setCategoryName('');
            setCategoryImage(null);
            setModalVisible(false);
            fetchCategorys();
        } catch (error) {
            Alert.alert('Lỗi', 'Thêm danh mục sản phẩm thất bại');
        }
    };

    const handleEditCategory = (category) => {
        setModalVisible(true);
        setSelectedCategory(category);
        setCategoryName(category.name);
        setCategoryImage(food.img);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await CategoryController.deleteCategory(category);
            fetchCategorys();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleSubmit = async () => {
        if (selectedCategory) {
            const updateCategory = {
                ...selectedCategory,
                name: categoryName,
            };
            await CategoryController.updateCategory(selectedCategory.id, updateCategory);
        } else {
            const newCategory = {
                name: categoryName,
            };
            await CategoryController.addCategory(newCategory);
        }

        setModalVisible(false);
        fetchCategorys();
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.categoryImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditCategory(item)}
            >
                <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCategory(item.id)}
            >
                <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Thêm danh mục sản phẩm</Text>
            </TouchableOpacity>

            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatList}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                            {categoryImage ? (
                                <Image source={{ uri: categoryImage }} style={styles.categoryImage} />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Text style={styles.placeholderText}>Chọn ảnh</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedCategory ? 'Sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tên sản phẩm"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />

                        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    flatList: {
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        borderRadius: 5,
    },
    categoryImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        width: '80%',
    },
    imageButton: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#888',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ManageCategory;
