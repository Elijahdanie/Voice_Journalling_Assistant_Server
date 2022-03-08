import { Sequelize } from 'sequelize-typescript'
import { Action, createExpressServer, useContainer } from 'routing-controllers'
import { createServer } from 'http'
import User from './models/user';
import Journal from './models/Journal';
import {Container} from 'typedi'
import {auth} from './auth/auth'
import 'reflect-metadata';

const port = process.env.PORT || 3000

const sequelize = new Sequelize({logging:true, database:'vjournal', dialect: 'sqlite', storage:'./vournal.sqlite3'})

useContainer(Container)
const app = createExpressServer({
    currentUserChecker: async (action: Action) => {
        const token = action.request.headers['authorization'];
        return auth.getUser(token);
      },
      authorizationChecker: (action: Action) => {
        const token = action.request.headers['authorization'];
        return auth.isAuthorized(token);
      },
    cors: true,
    classTransformer: false,
    controllers: [__dirname + "/controllers/**/*{.ts,.js}"]
})
async function init () {
    const server = createServer(app)
    sequelize.addModels([
        User,
        Journal
    ])
    await sequelize.sync()
    server.listen(port, ()=>{
        console.log(`server connected on port ${port}`)
    })
}

init()
