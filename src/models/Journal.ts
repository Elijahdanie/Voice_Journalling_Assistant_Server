import { Column, PrimaryKey, Unique, IsUUID, ForeignKey, Model, Table, DataType, NotNull} from "sequelize-typescript";
import User from "./user";

@Table({timestamps:true})
export default class Journal extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Column
    id:string

    @Column
    title:string

    @Column(DataType.JSON)
    session:string

    @Column
    @ForeignKey(()=>User)
    userid:string
}
