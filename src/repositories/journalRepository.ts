import { Service } from "typedi";
import Journal from "../models/Journal";
import {JournalPreview} from "../props/journalPreview"

@Service()
export default class journalRepository {
    async get(id:any){
        try {            
            var result = await Journal.findByPk(id)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async getall(id:any):Promise<JournalPreview[]>{
        try {
            var result = await Journal.findAll({where:{userid:id}})
            return result.map(x=>new JournalPreview(x.id, x.title, x.updatedAt))
        } catch (error) {
            console.log(error)
        }
    }

    async create(payload:any):Promise<Journal>{
        try {            
            var journal = await Journal.create(payload)
            return journal
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, payload:any):Promise<Boolean>{
        try {            
            var journal = await Journal.findByPk(id)
            journal.update(payload)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async delete (id):Promise<Boolean>{
        try {
            var journal = await Journal.findByPk(id)
            if (journal)
            {
                await journal.destroy();
            }
            return true;
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
