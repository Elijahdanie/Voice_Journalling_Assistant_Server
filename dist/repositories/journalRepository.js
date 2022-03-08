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
const journalPreview_1 = require("../props/journalPreview");
let journalRepository = class journalRepository {
    async get(id) {
        try {
            var result = await Journal_1.default.findByPk(id);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getall(user) {
        try {
            var result = await Journal_1.default.findAll({ where: { user_id: user.id } });
            return result.map(x => new journalPreview_1.JournalPreview(x.id, x.title, x.updatedAt));
        }
        catch (error) {
            console.log(error);
        }
    }
    async create(payload) {
        try {
            var journal = await Journal_1.default.create(payload);
            return journal;
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(id, payload) {
        try {
            var journal = await Journal_1.default.findByPk(id);
            journal.update(payload);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async delete(id) {
        try {
            var journal = await Journal_1.default.findByPk(id);
            if (journal) {
                await journal.destroy();
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
journalRepository = __decorate([
    (0, typedi_1.Service)()
], journalRepository);
exports.default = journalRepository;
