import database from '@react-native-firebase/database';
import OrderDetailModel from '../models/OrderDetailModel';
import OrderModel from '../models/OrderModel';

class OrderController {

  async createOrder(idUser, name, phoneNumber, address, orderDetails) {
    try {
      const orderRef = await database().ref('Orders').push();

      const order = new OrderModel(orderRef.key, idUser, name, phoneNumber, address);
      await orderRef.set(order);

      const orderDetailsRef = await database().ref(`OrderDetails/${orderRef.key}`);

      const orderDetailsArray = [];

      orderDetails.forEach((orderDetail) => {
        const { idFood, quantity, price, total } = orderDetail;
        const orderDetailModel = new OrderDetailModel(null, orderRef.key, idFood, quantity, price, total);
        orderDetailsArray.push(orderDetailModel);
      });

      await orderDetailsRef.set(orderDetailsArray);

      return order;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create order.');
    }
  }


  async getOrder(id) {
    try {
      const orderSnapshot = await database().ref(`Orders/${id}`).once('value');
      const orderData = orderSnapshot.val();

      const order = new OrderModel(orderSnapshot.key, orderData.idUser, orderData.name, orderData.phoneNumber, orderData.address);

      const orderDetailsSnapshot = await database().ref(`OrderDetails/${id}`).once('value');
      const orderDetailsData = orderDetailsSnapshot.val();

      const orderDetailsArray = [];

      orderDetailsData.forEach((orderDetailData) => {
        const { idOrder, idFood, quantity, price, total } = orderDetailData;
        const orderDetailModel = new OrderDetailModel(idOrder, idOrder, idFood, quantity, price, total);
        orderDetailsArray.push(orderDetailModel);
      });

      order.setOrderDetails(orderDetailsArray);

      return order;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to get order.');
    }
  }


  async updateOrder(order) {
    try {
      const { id, idUser, name, phoneNumber, address } = order;

      await database().ref(`Orders/${id}`).update({
        idUser,
        name,
        phoneNumber,
        address,
      });

      console.log('Order updated successfully.');
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update order.');
    }
  }


  async deleteOrder(id) {
    try {
      await database().ref(`Orders/${id}`).remove();
      await database().ref(`OrderDetails/${id}`).remove();

      console.log('Order deleted successfully.');
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to delete order.');
    }
  }

  async clearCart(userId) {
    try {
      await database().ref(`Users/${userId}/cart`).remove();
      console.log('Cart cleared successfully.');
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to clear cart.');
    }
  }

}

export default OrderController;