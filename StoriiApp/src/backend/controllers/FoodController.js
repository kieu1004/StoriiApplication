import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import FoodModel from '../models/FoodModel';

class FoodController {

  static async getFoodList() {
    try {
      const foodList = [];

      const snapshot = await firebase.database()
        .ref('Foods')
        .orderByChild('createdAt')
        .once('value');

      snapshot.forEach((childSnapshot) => {
        const foodData = childSnapshot.val();
        const food = new FoodModel(
          childSnapshot.key,
          foodData.img,
          foodData.name,
          foodData.price,
          foodData.quantity,
          foodData.description,
          foodData.idCategory
        );

        foodList.push(food);
      });

      return foodList;
    } catch (error) {
      console.error('Error getting food list:', error);
      throw error;
    }
  }

  static async addFood(food, addComplete) {
    try {
      const foodRef = firebase.database().ref('Foods');
      const newFoodRef = foodRef.push();

      food.id = newFoodRef.key;
      food.createdAt = firebase.database.ServerValue.TIMESTAMP;

      await newFoodRef.set(food);
      addComplete(food);
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  }

  static async updateFood(food, updateComplete) {
    try {
      food.updatedAt = firebase.database.ServerValue.TIMESTAMP;
      await firebase.database()
        .ref(`Foods/${food.id}`)
        .set(food);
      updateComplete(food);
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  }

  static async deleteFood(food, deleteComplete) {
    try {
      await firebase.database()
        .ref(`Foods/${food.id}`)
        .remove();
      deleteComplete();
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  }

  static async uploadFood(food, onFoodUploaded, { updating }) {
    try {
      if (food.imageUri) {
        const fileExtension = food.imageUri.split('.').pop();
        const uuid = uuidv4();
        const fileName = `${uuid}.${fileExtension}`;
        const storageRef = firebase.storage().ref(`foods/images/${fileName}`);

        const uploadTask = storageRef.putFile(food.imageUri);

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

                food.img = downloadUrl;
                delete food.imageUri;

                if (updating) {
                  console.log('Updating...');
                  FoodController.updateFood(food, onFoodUploaded);
                } else {
                  console.log('Adding...');
                  FoodController.addFood(food, onFoodUploaded);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      } else {
        console.log('Skipping image upload');
        delete food.imageUri;

        if (updating) {
          console.log('Updating...');
          FoodController.updateFood(food, onFoodUploaded);
        } else {
          console.log('Adding...');
          FoodController.addFood(food, onFoodUploaded);
        }
      }
    } catch (error) {
      console.error('Error uploading food:', error);
      throw error;
    }
  }
}

export default FoodController;