import { Service } from "typedi";
import Journal from "../models/Journal";
import User from "../models/user";

@Service()
export default class userRepository {
    async createUser(payload) : Promise<User>
    {
        try {
            var user = await User.create(payload)
            return user   
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(id):Promise<Boolean>{
        try {
            var user = await User.findByPk(id)
            user.destroy()
            return true
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(payload): Promise<any>
    {
        console.log(payload)
       var user = await User.findOne({where:{email:payload.email}, include:[Journal]})
       return user 
    }

    async updateuserinfo(info): Promise<User>
    {
        var user = await User.findByPk(info.id)
        return await user.update(info)
    }
}
