"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
//sign in data
const mockdata = {};
describe('test for user', () => {
    var userrepo = new userRepository_1.default();
    it('create user', () => {
        userrepo.createUser(mockdata);
    });
    it('update user', () => {
    });
    it('retrieve user journals', () => {
    });
    it('update a user journal', () => {
    });
    it('update user settings', () => {
    });
});
describe('test for journal', () => {
    it('create journal', () => {
    });
    it('updates a journal', () => {
    });
    it('retrieve a journal', () => {
    });
    it('delete a journal', () => {
    });
});
