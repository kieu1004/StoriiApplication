class OrderDetailModel {
    constructor(id, idOrder, idFood, quantity, price) {
        this._id = id;
        this._idOrder = idOrder;
        this._idFood = idFood;
        this._quantity = quantity;
        this._price = price;
    }

    // Getter và setter cho thuộc tính id
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    // Getter và setter cho thuộc tính idOrder
    get idOrder() {
        return this._idOrder;
    }

    set idOrder(value) {
        this._idOrder = value;
    }

    // Getter và setter cho thuộc tính idFood
    get idFood() {
        return this._idFood;
    }

    set idFood(value) {
        this._idFood = value;
    }

    // Getter và setter cho thuộc tính quantity
    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    // Getter và setter cho thuộc tính price
    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}

export default OrderDetailModel;