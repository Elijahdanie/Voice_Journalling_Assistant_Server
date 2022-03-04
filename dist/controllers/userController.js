"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const uuid4_1 = __importDefault(require("uuid4"));
let userController = class userController {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async registerUser(payload, response) {
        try {
            const user = await this._userRepository.createUser(Object.assign(Object.assign({}, payload), { id: (0, uuid4_1.default)() }));
            return response.status(200).json(user);
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/register'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "registerUser", null);
userController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/user'),
    __metadata("design:paramtypes", [userRepository_1.default])
], userController);
exports.default = userController;
