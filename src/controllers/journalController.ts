import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import journalRepository from "../repositories/journalRepository";
import { Response } from 'express'
import uuid from 'uuid4'

@Service()
@JsonController('/journal')
export default class journalController {
    _journalRepository: journalRepository
    constructor(_journalRepository: journalRepository) {
        this._journalRepository = _journalRepository
    }
    b
    @Authorized()
    @Post('/create')
    async createJournal(@CurrentUser() user: any, @Body() payload: any, @Res() res: Response) {
        try {
            const { title, session } = payload;
            if (title && session) {
                const userid = user.id;
                await this._journalRepository.create({...payload, userid, id:uuid()})
                return res.status(200).json({ message: "Journal Created Successfully" })
            }
            else {
                return res.status(500).json({ message: "Invalid parameters" })
            }
        } catch (error) {
            console.log(error)
            return res.json({
                message: "Unable to process this request",
                success: false,
                statusCode: 500
            })
        }
    }


    @Authorized()
    @Post('/:id')
    async updateJournal(@Param('id') id: string, @Body() payload: any, @Res() res: any) {
        try {
            var journal = await this._journalRepository.update(id, payload)
            if(journal)
            {
                return res.status(200).json({ message: "Journal updated Successfully", success:false })
            }
            else
            {
                return res.status(400).json({message:'Unable to update', success:false})
            }
        } catch (error) {
            console.log(error)
            return res.json({
                message: "Unable to process this request",
                success: false,
                statusCode: 500
            })
        }
    }

    @Authorized()
    @Get('/:id')
    async getJournal(@Param('id') id: string, @Res() res: any) {
        try {
            var journal = await this._journalRepository.get(id)
            if(journal)
            {
            return res.status(200).json({
                message: "retrieved journal successfully",
                journal,
                success:true
            })
        }
        else
        {
            return res.status(404).json({
                message: "Journal Not found",
                success: false
            })
        }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Unable to process this request",
                success: false
            })
        }
    }

    @Authorized()
    @Delete('/:id')
    async deleteJournal(@Param('id') id: string, @Res() res: any) {
        try {
            var deleted = await this._journalRepository.delete(id)
            if (deleted)
                return res.status(200).json({message:"deleted successfully", success:true})
            else
                return res.status(404).json({message:'Unable to delete', success:false})
        } catch (error) {
            console.log(error)
            return res.json({
                message: "Unable to process this request",
                success: false,
                statusCode: 500
            })
        }
    }
}
