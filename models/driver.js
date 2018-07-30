const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    email: {
        type:String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    location: String
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;

// Mongo Use GEOJSON to represent all the geography.
//geojson.org