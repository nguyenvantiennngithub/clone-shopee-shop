const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const cartSchema = new mongoose.Schema(
    {
        name: {type: String},
        img: { type: String},
        price: {type: Number},
        quantity: { type: Number},
        color: { type: String},
        idProduct: {type: String}
    }
);


const userSchema = new Schema(
    {
        name: { type: String },
        password: { type: String},
        carts: { type: Array},
        isPaid: { type: Boolean, default: false}
    },
    {
        timestamps: true,
    },
);

userSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    validateBeforeDelete: true,
});

module.exports = mongoose.model('user', userSchema);