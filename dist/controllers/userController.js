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
const auth_1 = require("../auth/auth");
const journalRepository_1 = __importDefault(require("../repositories/journalRepository"));
let userController = class userController {
    constructor(_userRepository, _jouurnalRepository) {
        this._userRepository = _userRepository;
        this._journalRepository = _jouurnalRepository;
    }
    async registerUser(payload, response) {
        try {
            console.log(payload);
            const { email, username, password } = payload;
            if (!email || !username || !password) {
                return response.status(500).json({
                    message: 'Invalid values passed in',
                    success: false
                });
            }
            const user = await this._userRepository.createUser(Object.assign(Object.assign({}, payload), { id: (0, uuid4_1.default)() }));
            const signProp = {
                id: user.id,
                type: 'RegUr'
            };
            const token = auth_1.auth.signUser(signProp);
            return response.status(200).json({ user, token, message: "sucess", success: true });
        }
        catch (e) {
            console.log(e);
            return response.status(500).json({
                message: 'Unable to process request',
                success: false
            });
            console.log(e);
        }
    }
    async getall(user, res) {
        try {
            var journals = await this._journalRepository.getall(user.id);
            return res.status(200).json({
                message: "retrieved journal successfully",
                "journals": journals,
                success: true
            });
        }
        catch (error) {
            console.log(error);
            return res.json({
                message: "Unable to process this request",
                success: false,
                statusCode: 500
            });
        }
    }
    async signUser(payload, response) {
        try {
            const { email, password } = payload;
            if (!email || !password) {
                return response.status(500).json({
                    message: 'Empty values in payload',
                    success: false
                });
            }
            const user = await this._userRepository.getUser({ email });
            if (user) {
                var valid = user.validatePwd(password);
                if (valid) {
                    const signProp = {
                        id: user.id,
                        type: 'RegUr'
                    };
                    const token = auth_1.auth.signUser(signProp);
                    return response.status(200).json({ user, token, message: "sucess", success: true });
                }
                else {
                    return response.status(500).json({
                        message: 'Wrong password',
                        success: false
                    });
                }
            }
            else {
                return response.status(500).json({
                    message: 'This email is not registered',
                    success: false
                });
            }
        }
        catch (e) {
            console.log(e);
            return response.status(500).json({
                message: 'Unable to process request',
                success: false
            });
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
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/journals'),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "getall", null);
__decorate([
    (0, routing_controllers_1.Post)('/signin'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "signUser", null);
userController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/user'),
    __metadata("design:paramtypes", [userRepository_1.default, journalRepository_1.default])
], userController);
exports.default = userController;
