import { Service } from "typedi";
import Journal from "../models/Journal";

@Service()
export default class journalRepository {
    async getJournals(user:any){
        try {            
            var result = await Journal.findAll({where:{user_id:user.id}})
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async getJournal(id:any){
        try {
            var result = await Journal.findAll({where:{id:id}})
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async create(payload:any){
        try {            
            var journal = await Journal.create(payload)
            return journal
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, payload:any){
        try {            
            var journal = await Journal.findByPk(id)
            journal.update(payload)
        } catch (error) {
            console.log(error)
        }
    }
}
