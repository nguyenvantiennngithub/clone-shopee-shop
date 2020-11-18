class mongooseToObject {
    mongoosesToObject(values) {
        return values.map((value) => value.toObject());
    }
    mongooseToObject(value) {
        return value.toObject();
    }
}

module.exports = new mongooseToObject();
