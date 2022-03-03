import { expect } from 'chai'
import userRepository from '../repositories/userRepository'

//sign in data
const mockdata = {

}

describe('test for user', ()=>{
    var userrepo = new userRepository()
    it('create user', ()=>{
        userrepo.createUser(mockdata)
    })

    it('update user', ()=>{

    })

    it('retrieve user journals', ()=>{

    })

    it('update a user journal', ()=>{

    })

    it('update user settings', ()=>{
        
    })
})

describe('test for journal', ()=>{
    it('create journal', ()=>{

    })

    it('updates a journal', ()=>{

    })

    it('retrieve a journal', ()=>{

    })

    it('delete a journal', ()=>{

    })
})