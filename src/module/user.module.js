const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const userSchema = new Schema(
    {
        name: { type: String },
        password: { type: String}
    },
    {
        timestamps: true,
    },
);

userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: 'all',
    validateBeforeDelete: true,
});

module.exports = mongoose.model('user', userSchema);