"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    _username = "sama";
    constructor() { }
    signup = async (req, res) => {
        const { email, password, username, confirmPassword, gender } = req.body;
        console.log({ email, password, username, confirmPassword, gender });
        return res.status(200).json({
            message: "signup success",
            data: { email, password, username, confirmPassword, gender }
        });
    };
    login = async (req, res) => {
        const { email, password } = req.body;
        return res.status(200).json({
            message: "login success",
            data: email
        });
    };
}
exports.default = new AuthService(); // singleton
