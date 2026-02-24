import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../config/db';

export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export const UserModel = {

    findAll:async () => {
        const [rows] = await pool.query<User[]>('SELECT * FROM users');
        return rows;
    },

    findById: async (id:number)=> {
        const [ rows ] = await pool.query<User[]>('SELECT * FROM users WHERE id = ? ',[id]);
        return rows[0] || null
    },

    create: async(name:string,email:string)=>{
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO users (name,email) VALUES (?,?)",[name,email] 
        )
        return result;
    }


}