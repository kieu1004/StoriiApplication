import database from '@react-native-firebase/database'
import FoodModel from '../models/FoodModel'

class FoodController {
    //Phương thức lấy ra danh sách sản phẩm
    static async getAllFoods() {
        try {
            const foodsRef = database().ref('/Foods');
            const snapshot = await foodsRef.once('value');
            const foodsData = snapshot.val();

            if (foodsData) {
                const foods = Object.entries(foodsData).map(([foodId, foodData]) => {
                    return new FoodModel(
                        foodId,
                        foodData.name,
                        foodData.price,
                        foodData.img,
                        foodData.description,
                        foodData.statusFood,
                        foodData.idProvider,
                        foodData.idCategory
                    );
                });

                return foods;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error getting all foods:', error);
            throw error;
        }
    }

    //Phương thức lấy thông tin sản phẩm theo id
    static async getFoodById(foodId) {
        try {
            const foodRef = database().ref(`/Foods/${foodId}`);
            const snapshot = await foodRef.once('value');
            const foodData = snapshot.val();

            if (foodData) {
                const food = new FoodModel(
                    foodId,
                    foodData.name,
                    foodData.price,
                    foodData.img,
                    foodData.description,
                    foodData.statusFood,
                    foodData.idProvider,
                    foodData.idCategory
                );

                return food;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting food by id:', error);
            throw error;
        }
    }

    //Phương thức thêm sản phẩm
    static async addFood(food) {
        try {
            const foodRef = database().ref('/Foods');
            const newFoodRef = foodRef.push();

            food.id = newFoodRef.key;
            await newFoodRef.set(food);

            return food.id;
        } catch (error) {
            console.error('Error adding food:', error);
            throw error;
        }
    }

    //Phương thức cập nhật sản phẩm
    static async updateFood(foodId, updatedFood) {
        try {
            const foodRef = database().ref(`/Foods/${foodId}`);
            await foodRef.update(updatedFood);
        } catch (error) {
            console.error('Error updating food:', error);
            throw error;
        }
    }

    //Phương thức xóa sản phẩm
    static async deleteFood(foodId) {
        try {
            const foodRef = database().ref(`/Foods/${foodId}`);
            await foodRef.remove();
        } catch (error) {
            console.error('Error deleting food:', error);
            throw error;
        }
    }
}

export default FoodController;
