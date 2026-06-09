"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalfield = exports.validation = void 0;
const zod_1 = __importDefault(require("zod"));
const error_res_1 = require("../utils/response/error.res");
const validation = (schema) => {
    return (req, res, next) => {
        const validationError = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
            const validationResults = schema[key].safeParse(req[key]);
            if (validationResults.success === false) {
                const errors = validationResults.error;
                validationError.push({
                    key: key,
                    issue: errors.issues.map((issue) => ({
                        path: issue.path,
                        message: issue.message,
                        code: issue.code,
                    })),
                });
            }
        }
        if (validationError.length > 0) {
            throw new error_res_1.BadRequestException("Validation Error", {
                cause: validationError,
            });
        }
        return next();
    };
};
exports.validation = validation;
exports.generalfield = {
    email: zod_1.default.email({ error: "Email is required" }),
    password: zod_1.default.string().
        min(6, { error: "Password must be at least 6 characters long" })
        .max(30, {
        error: "Password must be at most 30 characters long",
    }),
    username: zod_1.default.string({ error: "Username is required" })
        .min(3, { error: "Username must be at least 3 characters long" })
        .max(20, { error: "Username must be at most 20 characters long" }),
    confirmPassword: zod_1.default.string().
        min(6, { error: "Confirm password must be at least 6 characters long" })
        .max(30, { error: "Confirm password must be at most 30 characters long" }),
    gender: zod_1.default.enum(["male", "female"], { error: "Gender must be either male or female" }).optional(),
};
