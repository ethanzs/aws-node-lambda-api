const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Entry = new Schema({
    first: String,
    last: String,
    age: Number,
    email: String,
});

module.exports = mongoose.model("Entry", Entry);