"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
const validation_middleware_1 = require("../../middleware/validation.middleware");
exports.LoginSchema = {
    body: zod_1.z.object({
        email: validation_middleware_1.generalfield.email,
        password: validation_middleware_1.generalfield.password,
    })
};
exports.SignupSchema = {
    body: exports.LoginSchema.body.extend({
        username: validation_middleware_1.generalfield.username,
        gender: validation_middleware_1.generalfield.gender,
        confirmPassword: validation_middleware_1.generalfield.confirmPassword,
    })
        .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                error: "Passwords do not match",
            });
        }
        if (data.username?.split(" ").length !== 2) {
            ctx.addIssue({
                code: "custom",
                path: ["username"],
                error: "Username must be 2 words",
            });
        }
    })
};
