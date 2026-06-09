"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const modules_1 = require("./modules");
const error_res_1 = require("./utils/response/error.res");
const connections_1 = __importDefault(require("./DB/connections"));
const cors_utils_1 = require("./utils/cors/cors.utils");
// rate limmit
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes",
    },
});
const bootstrap = async (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(cors_utils_1.corsOptions));
    app.use((0, helmet_1.default)());
    app.use(limiter);
    // DB connection
    await (0, connections_1.default)();
    app.get("/", (req, res) => {
        return res.send("Welcome from socail-media");
    });
    app.use("/api/auth", modules_1.authRouter);
    app.use("/api/post", modules_1.postRouter);
    app.use("/api/comment", modules_1.commentRouter);
    app.use("/api/user", modules_1.userRouter);
    app.use(error_res_1.globalErrorHandler);
    app.all("/*dummy", (req, res) => {
        throw new error_res_1.NotFoundException("Not Found Handler");
    });
};
exports.default = bootstrap;
