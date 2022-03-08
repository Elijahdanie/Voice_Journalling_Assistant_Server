import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import journalRepository from "../repositories/journalRepository";
import { Response } from 'express'

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
            if (!title || !session) {
                await this._journalRepository.create(payload)
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
            await this._journalRepository.update(id, payload)
            return res.status(200).json({ message: "Journal updated Successfully" })
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
            return res.status(200).json({
                message: "retrieved journal successfully",
                journal,
                success:true
            })
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
    @Get('/all')
    async getall(@CurrentUser() user:any, @Res() res: any) {
        try {
            var journals = await this._journalRepository.getall(user)
            return res.status(200).json({
                message: "retrieved journal successfully",
                journals,
                success:true
            })
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
    @Delete('/:id')
    async deleteJournal(@Param('id') id: string, @Res() res: any) {
        try {
            await this._journalRepository.delete(id)
            return res.status(200).json({message:"deleted successfully"})
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
