import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CategoryModel from '../models/CategoryModel';

class CategoryController {

  static async getCategoryList() {
    try {
      const categoryList = [];

      const snapshot = await firebase.database()
        .ref('Categories')
        .orderByChild('createdAt')
        .once('value');

      snapshot.forEach((childSnapshot) => {
        const categoryData = childSnapshot.val();
        const category = new CategoryModel(
          childSnapshot.key,
          categoryData.name,
          categoryData.img,
        );

        categoryList.push(category);
      });

      return categoryList;
    } catch (error) {
      console.error('Error getting category list:', error);
      throw error;
    }
  }


  static async addCategory(category, addComplete) {
    try {
      const categoryRef = firebase.database().ref('Categories');
      const newCategoryRef = categoryRef.push();

      category.id = newCategoryRef.key;
      category.createdAt = firebase.database.ServerValue.TIMESTAMP;

      await newCategoryRef.set(category);
      addComplete(category);
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  }

  static async updateCategory(category, updateComplete) {
    try {
      category.updatedAt = firebase.database.ServerValue.TIMESTAMP;
      await firebase.database()
        .ref(`Categories/${category.id}`)
        .set(category);
      updateComplete(category);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  static async deleteCategory(category, deleteComplete) {
    try {
      await firebase.database()
        .ref(`Categories/${category.id}`)
        .remove();
      deleteComplete();
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  static async uploadCategory(category, onCategoryUploaded, { updating }) {
    try {
      if (category.imageUri) {
        const fileExtension = category.imageUri.split('.').pop();
        const uuid = uuidv4();
        const fileName = `${uuid}.${fileExtension}`;
        const storageRef = firebase.storage().ref(`Categories/images/${fileName}`);

        const uploadTask = storageRef.putFile(category.imageUri);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress}%`);

            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              console.log('Upload success');
            }
          },
          (error) => {
            console.log(`Image upload error: ${error}`);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL()
              .then((downloadUrl) => {
                console.log(`File available at: ${downloadUrl}`);

                category.img = downloadUrl;
                delete category.imageUri;

                if (updating) {
                  console.log('Updating...');
                  CategoryController.updateCategory(category, onCategoryUploaded);
                } else {
                  console.log('Adding...');
                  CategoryController.addCategory(category, onCategoryUploaded);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      } else {
        console.log('Skipping image upload');
        delete category.imageUri;

        if (updating) {
          console.log('Updating...');
          CategoryController.updateCategory(category, onCategoryUploaded);
        } else {
          console.log('Adding...');
          CategoryController.addCategory(category, onCategoryUploaded);
        }
      }
    } catch (error) {
      console.error('Error uploading category:', error);
      throw error;
    }
  }
}

export default CategoryController;