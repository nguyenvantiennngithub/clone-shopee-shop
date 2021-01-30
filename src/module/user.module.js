const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);


const userSchema = new Schema(
    {
        name: { type: String },
        password: { type: String},
        carts: { type: Array},
        isPaid: { type: Boolean, default: false},
        phone: {type: String},
        nickname: { type: String},
        phone: { type: String},
        provincial: { type: String},
        district: { type: String},
        commune: { type: String},
        address: { type: String},
        paid: { type: Array}
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
