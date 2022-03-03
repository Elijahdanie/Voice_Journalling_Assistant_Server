import { Authorized, CurrentUser, Delete, Get, JsonController, Param, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import journalRepository from "../repositories/journalRepository";
import {Response} from 'express'

@Service()
@JsonController('/journal')
export default class journalController {
    _journalRepository:journalRepository
    constructor(_journalRepository: journalRepository) {
        this._journalRepository = _journalRepository
    }

    @Authorized()
    @Post('/create')
    async createJournal (@CurrentUser() user:any, @Res() res:Response)
    {
        try {
            
        } catch (error) {
            console.log(error)
            return res.json({
                success:false,
                statusCode:500
            })
        }
    }


    @Authorized()
    @Post('/:id')
    async updateJournal (@Param('id') id:string, @Res() res:any){
        try {
            
        } catch (error) {
            console.log('error')
        }
    }

    @Authorized()
    @Get('/:id')
    async getJournal (@Param('id') id:string, @Res() res:any){
        try {
            
        } catch (error) {
            console.log('error')
        }
    }

    @Authorized()
    @Delete('/:id')
    async deleteJournal (@Param('id') id:string, @Res() res:any){
        try {
            
        } catch (error) {
            console.log('error')
        }
    }
}
