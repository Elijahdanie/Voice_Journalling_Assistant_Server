"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Journal_1 = __importDefault(require("../models/Journal"));
const user_1 = __importDefault(require("../models/user"));
let userRepository = class userRepository {
    async createUser(payload) {
        try {
            var user = await user_1.default.create(payload);
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteUser(id) {
        try {
            var user = await user_1.default.findByPk(id);
            user.destroy();
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUser(payload) {
        console.log(payload);
        var user = await user_1.default.findOne({ where: { email: payload.email }, include: [Journal_1.default] });
        return user;
    }
    async updateuserinfo(info) {
        var user = await user_1.default.findByPk(info.id);
        return await user.update(info);
    }
};
userRepository = __decorate([
    (0, typedi_1.Service)()
], userRepository);
exports.default = userRepository;
