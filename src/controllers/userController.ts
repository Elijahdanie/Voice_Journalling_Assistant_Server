import { Response } from "express";
import { JsonController, Post, Res, Body, Authorized, CurrentUser } from "routing-controllers";
import { Service } from "typedi";
import User from "../models/user";
import userRepository from "../repositories/userRepository";
import uuid from 'uuid4'
import { auth } from "../auth/auth";

@Service()
@JsonController('/user')
export default class userController {
    _userRepository: userRepository
    constructor(_userRepository: userRepository) {
        this._userRepository = _userRepository
    }
    @Post('/register')
    async registerUser(@Body() payload: any, @Res() response: Response) {
        try {
            const {email, username, password} = payload;
            if (!email || !username || !password)
            {
                return response.status(500).json({
                    message:'Invalid values passed in',
                    success:false
                })
            }
            const user = await this._userRepository.createUser({ ...payload, id: uuid() });
            const signProp = {
                id: user.id,
                type: 'RegUr'
            }
            const token = auth.signUser(signProp)
            return response.status(200).json({ ...user, token, message: "sucess", success: true })
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: 'Unable to process request',
                success: false
            })
            console.log(e);
        }
    }


    @Post('/signin')
    async signUser(@Body() payload: any, @Res() response: Response) {
        try {
            const { email, password } = payload
            if(!email || !password) {
                return response.status(500).json({
                    message:'Empty values in payload',
                    success:false
                })
            }
            const user = await this._userRepository.getUser({ email });
            if (user) {
                var valid = user.validatePwd(password)
                if (valid) {
                    const signProp = {
                        id: user.id,
                        type: 'RegUr'
                    }
                    const token = auth.signUser(signProp)
                    return response.status(200).json({ ...user, token, message: "sucess", success: true })
                }
                else {
                    return response.status(500).json({
                        message: 'Wrong password',
                        success: false
                    })
                }
            } else {
                return response.status(500).json({
                    message: 'This email is not registered',
                    success: false
                })
            }
        } catch (e) {
            console.log(e);
            return response.status(500).json({
                message: 'Unable to process request',
                success: false
            })
        }
    }

    @Post('/settings/create')
    async saveSettings(@CurrentUser() user:any, @Res() response:any){
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}
