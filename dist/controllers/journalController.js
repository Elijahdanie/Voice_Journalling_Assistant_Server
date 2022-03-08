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
const journalRepository_1 = __importDefault(require("../repositories/journalRepository"));
let journalController = class journalController {
    constructor(_journalRepository) {
        this._journalRepository = _journalRepository;
    }
    async createJournal(user, payload, res) {
        try {
            const { title, session } = payload;
            if (!title || !session) {
                await this._journalRepository.create(payload);
                return res.status(200).json({ message: "Journal Created Successfully" });
            }
            else {
                return res.status(500).json({ message: "Invalid parameters" });
            }
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
    async updateJournal(id, payload, res) {
        try {
            await this._journalRepository.update(id, payload);
            return res.status(200).json({ message: "Journal updated Successfully" });
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
    async getJournal(id, res) {
        try {
            var journal = await this._journalRepository.get(id);
            return res.status(200).json({
                message: "retrieved journal successfully",
                journal,
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
    async getall(user, res) {
        try {
            var journals = await this._journalRepository.getall(user);
            return res.status(200).json({
                message: "retrieved journal successfully",
                journals,
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
    async deleteJournal(id, res) {
        try {
            await this._journalRepository.delete(id);
            return res.status(200).json({ message: "deleted successfully" });
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
};
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)('/create'),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], journalController.prototype, "createJournal", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], journalController.prototype, "updateJournal", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], journalController.prototype, "getJournal", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)('/all'),
    __param(0, (0, routing_controllers_1.CurrentUser)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], journalController.prototype, "getall", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], journalController.prototype, "deleteJournal", null);
journalController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/journal'),
    __metadata("design:paramtypes", [journalRepository_1.default])
], journalController);
exports.default = journalController;
