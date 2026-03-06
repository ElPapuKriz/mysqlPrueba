import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    id: number;
    name_student: string;
    lastname_student:string;
    email:string;
    created_at:Date;
    updated_at:Date;
}