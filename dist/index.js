"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const routing_controllers_1 = require("routing-controllers");
const http_1 = require("http");
const user_1 = __importDefault(require("./models/user"));
const Journal_1 = __importDefault(require("./models/Journal"));
const typedi_1 = require("typedi");
const auth_1 = require("./auth/auth");
require("reflect-metadata");
const port = process.env.PORT || 3000;
const sequelize = new sequelize_typescript_1.Sequelize({ logging: true, database: 'vjournal', dialect: 'sqlite', storage: './vournal.sqlite3' });
(0, routing_controllers_1.useContainer)(typedi_1.Container);
const app = (0, routing_controllers_1.createExpressServer)({
    currentUserChecker: async (action) => {
        const token = action.request.headers['authorization'];
        return auth_1.auth.getUser(token);
    },
    authorizationChecker: (action) => {
        const token = action.request.headers['authorization'];
        return auth_1.auth.isAuthorized(token);
    },
    cors: true,
    classTransformer: false,
    controllers: [__dirname + "/controllers/**/*{.ts,.js}"]
});
async function init() {
    const server = (0, http_1.createServer)(app);
    sequelize.addModels([
        user_1.default,
        Journal_1.default
    ]);
    await sequelize.sync();
    server.listen(port, () => {
        console.log(`server connected on port ${port}`);
    });
}
init();
