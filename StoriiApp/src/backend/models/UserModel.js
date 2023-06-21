class UserModel {
  constructor(email, password, role, fullName, dateOfBirth, address, avatar, phoneNumber, id) {
    this._email = email;
    this._password = password;
    this._role = role;
    this._fullName = fullName;
    this._dateOfBirth = dateOfBirth;
    this._address = address;
    this._avatar = avatar;
    this._phoneNumber = phoneNumber;
    this._id = id;
  }

  // Getter và setter cho thuộc tính email
  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  // Getter và setter cho thuộc tính password
  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  // Getter và setter cho thuộc tính role
  get role() {
    return this._role;
  }

  set role(value) {
    this._role = value;
  }

  // Getter và setter cho thuộc tính fullName
  get fullName() {
    return this._fullName;
  }

  set fullName(value) {
    this._fullName = value;
  }

  // Getter và setter cho thuộc tính dateOfBirth
  get dateOfBirth() {
    return this._dateOfBirth;
  }

  set dateOfBirth(value) {
    this._dateOfBirth = value;
  }

  // Getter và setter cho thuộc tính address
  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
  }

  // Getter và setter cho thuộc tính avatar
  get avatar() {
    return this._avatar;
  }

  set avatar(value) {
    this._avatar = value;
  }

  // Getter và setter cho thuộc tính phoneNumber
  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(value) {
    this._phoneNumber = value;
  }

  // Getter và setter cho thuộc tính id
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }
}

export default UserModel;