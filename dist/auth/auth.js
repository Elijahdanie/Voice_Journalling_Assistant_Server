"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const secret = 'testKey';
exports.auth = {
    signUser(signProp) {
        const token = jsonwebtoken_1.default.sign({ uE: signProp.id, }, secret, { expiresIn: '24h' });
        return token;
    },
    isAuthorized(token) {
        try {
            const sanitizedToken = sanitizeToken(token);
            return !!jsonwebtoken_1.default.verify(sanitizedToken, secret);
        }
        catch (err) {
            return false;
        }
    },
    async getUser(token) {
        const sanitizedToken = sanitizeToken(token);
        const userId = jsonwebtoken_1.default.verify(sanitizedToken, secret);
        return await user_1.default.findByPk(userId.uE);
    }
};
const sanitizeToken = (token) => {
    const tokenParts = token.split(' ');
    return tokenParts[1];
};
