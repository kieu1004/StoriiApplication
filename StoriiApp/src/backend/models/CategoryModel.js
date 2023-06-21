class CategoryModel {
    constructor(id, name, img) {
        this._id = id;
        this._name = name;
        this._img = img;
    }

    // Getter và setter cho thuộc tính id
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    // Getter và setter cho thuộc tính name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    // Getter và setter cho thuộc tính img
    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }
}

export default CategoryModel;  