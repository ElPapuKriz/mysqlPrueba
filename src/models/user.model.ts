import type { ResultSetHeader } from 'mysql2';
import { pool } from '../config/db';
import { userCreated } from '../types/userCreated.type';
import { User } from '../types/student.type';

export const UserModel = {

    findAll: async () => {
        const [rows] = await pool.query<User[]>('SELECT * FROM tb_students');
        return rows;
    },

    findById: async (id: number) => {
        const [rows] = await pool.query<User[]>('SELECT * FROM tb_students WHERE id = ? ', [id]);
        return rows[0] || null
    },

    create: async (data: userCreated) => {

        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO tb_students
        (name_student,lastname_student,email)
        VALUES 
        (?, ?, ?)
        `, [
            data.name_student,
            data.lastname_student,
            data.email,
        ])
        return result;
    }


}