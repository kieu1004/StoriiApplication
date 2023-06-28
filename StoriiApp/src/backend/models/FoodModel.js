class FoodModel {
    constructor(id, img, name, price, quantity, description, idCategory) {
        this._id = id;
        this._img = img;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._description = description;
        this._idCategory = idCategory;
    }

    // Getter và setter cho thuộc tính id
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

     // Getter và setter cho thuộc tính img
    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    // Getter và setter cho thuộc tính name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Getter và setter cho thuộc tính price
    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    // Getter và setter cho thuộc tính img
    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    // Getter và setter cho thuộc tính description
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    // Getter và setter cho thuộc tính idCategory
    get idCategory() {
        return this._idCategory;
    }

    set idCategory(value) {
        this._idCategory = value;
    }
}

export default FoodModel;