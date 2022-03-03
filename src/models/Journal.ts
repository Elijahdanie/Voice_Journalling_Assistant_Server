import { Column, PrimaryKey, Unique, IsUUID, ForeignKey, Model, Table} from "sequelize-typescript";
import User from "./user";

@Table({timestamps:true})
export default class Journal extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Column
    id:string

    @Column
    session:string

    @Column
    @ForeignKey(()=>User)
    user_id:string
}
