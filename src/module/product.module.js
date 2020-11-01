const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const productSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        img: { type: String },
        title: { type: String },
        start: { type: Number},
        evaluate: { type: Number },
        color: { type: Array },
        price : { type: Number },
        trademark: { type: String },
        category: { type: String },
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    },
);

productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: 'all',
    validateBeforeDelete: true,
});

module.exports = mongoose.model('courses', productSchema);