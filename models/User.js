const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    username: {type: String, required: true, default: ""},
    fullName: {type: String, required: true, default: ""},
    email: {type: String, required: true, default: ""},
    password: {type: String, required: true, default: ""},
    profilePhoto: {type: String, required: false, default: null},
    coverPhoto: {type: String, required: false, default: ""},
    balance: {type: Number, required: true, default: "20"},
    about: {type: String, required: false, default: ""},
    inventories: {type: Array, required: false, default: [], ref: "inventories"},
    deletedAt: {type: Date, required: false, default: ""},
    resetToken: {type: String, required: false, default: ""},
    resetTokenExpiration: {type: Date, required: false, default: ""},
    role: {type: String, required: true, default: ""},
    status: {type: String, required: true, default: "Inactive"}
},{timestamps: true});

module.exports = mongoose.model("users", UserModel);