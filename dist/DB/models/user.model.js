"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    confirmemailOTP: String,
    confirmEmailAt: Date,
    password: String,
    gender: String,
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
    collection: "users",
});
