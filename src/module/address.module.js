const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const districtchema = new Schema(
    {
        name: { type: String },
        districts: {type: Array},
        code : { type: String}
    },
    {
        timestamps: true,
    },
);

districtchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    validateBeforeDelete: true,
});

module.exports = mongoose.model('district', districtchema);