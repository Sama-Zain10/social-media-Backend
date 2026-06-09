"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const config_service_1 = require("./../../config/config.service");
const Whit_list = config_service_1.WHITE_LIST;
exports.corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (Whit_list.includes(origin))
            return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
};
