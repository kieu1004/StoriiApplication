import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import FoodController from '../../backend/controllers/FoodController'
import FoodModel from '../../backend/models/FoodModel'

const ManageProduct = () => {
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodQuantity, setFoodQuantity] = useState('');
    const [foodImage, setFoodImage] = useState(null);
    const [foodDescription, setFoodDescription] = useState('');
    const [foodSupplier, setFoodSupplier] = useState('');
    const [foodCategory, setFoodCategory] = useState('');

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
        // Kiểm tra các trường bắt buộc
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
            foodSupplier,
            foodCategory
        );

        try {
            const foodId = await FoodController.addFood(newFood);
            Alert.alert('Thành công', 'Thêm sản phẩm thành công');
            // Reset trạng thái và đóng modal
            setFoodName('');
            setFoodPrice('');
            setFoodQuantity('');
            setFoodImage(null);
            setFoodDescription('');
            setFoodSupplier('');
            setFoodCategory('');
        } catch (error) {
            Alert.alert('Lỗi', 'Thêm sản phẩm thất bại');
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={handleSelectImage}>
                {foodImage ? (
                    <Image source={{ uri: foodImage }} style={styles.foodImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>Chọn ảnh</Text>
                    </View>
                )}
            </TouchableOpacity>
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
                value={foodSupplier}
                onChangeText={setFoodSupplier}
            />
            <TextInput
                style={styles.input}
                placeholder="Danh mục sản phẩm"
                value={foodCategory}
                onChangeText={setFoodCategory}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Thêm sản phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ManageProduct;

const styles = {
    foodImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 16,
        color: '#888',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
};
