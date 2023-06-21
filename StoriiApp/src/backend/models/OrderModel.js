class OrderModel {
  constructor(id, idUser, idProvider, orderTime, statusOrder) {
    this._id = id;
    this._idUser = idUser;
    this._idProvider = idProvider;
    this._orderTime = orderTime;
    this._statusOrder = statusOrder;
  }

  // Getter và setter cho thuộc tính id
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  // Getter và setter cho thuộc tính idUser
  get idUser() {
    return this._idUser;
  }

  set idUser(value) {
    this._idUser = value;
  }

  // Getter và setter cho thuộc tính idProvider
  get idProvider() {
    return this._idProvider;
  }

  set idProvider(value) {
    this._idProvider = value;
  }

  // Getter và setter cho thuộc tính orderTime
  get orderTime() {
    return this._orderTime;
  }

  set orderTime(value) {
    this._orderTime = value;
  }

  // Getter và setter cho thuộc tính statusOrder
  get statusOrder() {
    return this._statusOrder;
  }

  set statusOrder(value) {
    this._statusOrder = value;
  }
}

export default OrderModel;