class OrderModel {
  constructor(id, idUser,name, phoneNumber, address) {
    this._id = id;
    this._idUser = idUser;
    this._name = name;
    this._phoneNumber = phoneNumber;
    this._address = address;
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

  // Getter và setter cho thuộc tính name
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  // Getter và setter cho thuộc tính phoneNumber
  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(value) {
    this._phoneNumber = value;
  }

  // Getter và setter cho thuộc tính address
  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
  }
}

export default OrderModel;