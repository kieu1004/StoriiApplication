import database from '@react-native-firebase/database';
import CategoryModel from '../models/CategoryModel';

class CategoryController {

    //Phương thức lấy ra danh sách danh mục sản phẩm
    static async getCategoryList() {
        try {
            const snapshot = await database().ref('/Categories').once('value');
            const categoryList = [];

            snapshot.forEach((childSnapshot) => {
                const category = new CategoryModel(
                    childSnapshot.key,
                    childSnapshot.val().name,
                    childSnapshot.val().img
                );

                categoryList.push(category);
            });

            return categoryList;
        } catch (error) {
            console.error('Error getting category list:', error);
            throw error;
        }
    }

    //Phương thức lấy ra danh mục sản phẩm theo Id
    static async getCategoryById(categoryId) {
        try {
            const snapshot = await database().ref(`/Categories/${categoryId}`).once('value');

            if (snapshot.exists()) {
                const category = new CategoryModel(
                    snapshot.key,
                    snapshot.val().name,
                    snapshot.val().img
                );

                return category;
            } else {
                throw new Error('Category not found');
            }
        } catch (error) {
            console.error('Error getting category by ID:', error);
            throw error;
        }
    }

    //Phương thức thêm danh mục mới
    static async addCategory(category) {
        try {
            const categoryRef = database().ref('/Categories');
            const newCategoryRef = categoryRef.push();

            category.id = newCategoryRef.key;
            await newCategoryRef.set(category);

            return category.id;
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    }

    //Phương thức cập nhật danh mục sản phẩm
    static async updateCategory(categoryId, updatedCategory) {
        try {
            const categoryRef = database().ref(`/categories/${categoryId}`);
            await categoryRef.update(updatedCategory);
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    //Phương thức xóa danh mục sản phẩm
    static async deleteCategory(categoryId) {
        try {
            const categoryRef = database().ref(`/Categories/${categoryId}`);
            await categoryRef.remove();
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }


}

export default CategoryController;
