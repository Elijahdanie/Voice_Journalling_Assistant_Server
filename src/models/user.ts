import { Column, PrimaryKey, Table, Unique, Model, HasMany, IsUUID, BeforeCreate, IsEmail } from "sequelize-typescript";
import Journal from "./Journal";
import bcrypt from 'bcrypt'


@Table({timestamps:true})
export default class User extends Model<User> {

    @PrimaryKey
    @IsUUID(4)
    @Column
    id:string

    @Unique
    @Column
    username:string

    @Unique
    @IsEmail
    @Column
    email:string

    @Column
    password:string

    @Column
    settings:string

    @HasMany(()=>Journal)
    journals:Journal[]

    @BeforeCreate
    static async encryptPassword (user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }

    async validatePwd(password: string): Promise<boolean> {
        let isPassword: boolean;
        isPassword = await bcrypt.compare(password, this.password);
        return isPassword;
    }
}
