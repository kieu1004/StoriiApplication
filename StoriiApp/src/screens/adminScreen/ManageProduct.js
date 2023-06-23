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
import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-picker';

import FoodController from '../../backend/controllers/FoodController';
import CategoryController from '../../backend/controllers/CategoryController';
import FoodModel from '../../backend/models/FoodModel';

const ManageProduct = () => {
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [foodImage, setFoodImage] = useState(null);
    const [foodDescription, setFoodDescription] = useState('');
    const [foodProvider, setFoodProvider] = useState('');
    const [foodCategory, setFoodCategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const foods = await FoodController.getAllFoods();
            setFoods(foods);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const categoryList = await CategoryController.getCategoryList();
            setCategories(categoryList);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSelectImage = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setFoodImage(response.uri);
            }
        });
    };

    const handleAddProduct = async () => {
        if (!foodName || !foodPrice || !foodQuantity || !foodImage) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const newFood = new FoodModel(
            null,
            foodName,
            foodPrice,
            foodImage,
            foodDescription,
            foodProvider,
            foodCategory
        );

        try {
            const foodId = await FoodController.addFood(newFood);
            Alert.alert('Thành công', 'Thêm sản phẩm thành công');
            setFoodName('');
            setFoodPrice('');
            setFoodQuantity('');
            setFoodImage(null);
            setFoodDescription('');
            setFoodProvider('');
            setFoodCategory('');
            setModalVisible(false);
            fetchFoods();
        } catch (error) {
            Alert.alert('Lỗi', 'Thêm sản phẩm thất bại');
        }
    };

    const handleEditProduct = (food) => {
        setModalVisible(true);
        setSelectedFood(food);
        setFoodName(food.name);
        setFoodPrice(food.price.toString());
        setFoodQuantity(food.quantity.toString());
        setFoodImage(food.img);
        setFoodDescription(food.description);
        setFoodProvider(food.provider);
        setFoodCategory(food.category);
    };

    const handleDeleteProduct = async (foodId) => {
        try {
            await FoodController.deleteFood(foodId);
            fetchFoods();
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    const handleSubmit = async () => {
        if (selectedFood) {
            const updatedFood = {
                ...selectedFood,
                name: foodName,
                price: parseFloat(foodPrice),
                quantity: parseInt(foodQuantity),
                category: selectedCategory,
            };
            await FoodController.updateFood(selectedFood.id, updatedFood);
        } else {
            const newFood = {
                name: foodName,
                price: parseFloat(foodPrice),
                quantity: parseInt(foodQuantity),
                category: selectedCategory,
            };
            await FoodController.addFood(newFood);
        }

        setModalVisible(false);
        fetchFoods();
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.foodImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditProduct(item)}
            >
                <Text style={styles.editButtonText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProduct(item.id)}
            >
                <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>

            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatList}
            />

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                            {foodImage ? (
                                <Image source={{ uri: foodImage }} style={styles.foodImage} />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Text style={styles.placeholderText}>Chọn ảnh</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedFood ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tên sản phẩm"
                            value={foodName}
                            onChangeText={setFoodName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Giá tiền"
                            value={foodPrice}
                            onChangeText={setFoodPrice}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Số lượng"
                            value={foodQuantity}
                            onChangeText={setFoodQuantity}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mô tả sản phẩm"
                            value={foodDescription}
                            onChangeText={setFoodDescription}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nhà cung cấp"
                            value={foodProvider}
                            onChangeText={setFoodProvider}
                        />
                        <ModalDropdown
                            options={categories.map(category => category.name)}
                            defaultValue={selectedCategory}
                            onSelect={(index, value) => setSelectedCategory(value)}
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownContainer}
                            dropdownTextStyle={styles.dropdownItemText}
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
    foodImage: {
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
    itemPrice: {
        fontSize: 14,
        color: 'green',
        marginBottom: 3,
    },
    itemQuantity: {
        fontSize: 14,
        color: 'blue',
    },
    editButton: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3,
        marginLeft: 10,
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
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdownContainer: {
        width: 'auto',
        marginTop: 5,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
    },
    dropdownItemText: {
        fontSize: 16,
        padding: 8,
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

export default ManageProduct;
