// const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');
// const slug = require('mongoose-slug-generator');
// const Schema = mongoose.Schema;
// mongoose.plugin(slug);
// const cartSchema = new Schema(
//     {
//         idProduct: {type: String},
//         quantity: { type: Number},
//         color: { type: String}
//     },
//     {
//         timestamps: true,
//     },
// );

// cartSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     deletedBy: true,
//     overrideMethods: 'all',
//     validateBeforeDelete: true,
// });

// module.exports = mongoose.model('cart', cartSchema);
