import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../config/db';

export interface User extends RowDataPacket {
    id: number;
    user_login: string;
    user_pass: string;
    user_nicename: string;
    user_email: string;
    user_url?: string;
    user_registered: Date;
    user_activation_key?: string;
    user_status: number;
    display_name: string;
}

export interface userCreated {
    user_login: string;
    user_pass: string;
    user_nicename?: string;
    user_email: string;
    user_url?: string;
    user_registered?: Date;
    user_activation_key?: string;
    user_status?: number;
    display_name?: string;
}

export const UserModel = {

    findAll: async () => {
        const [rows] = await pool.query<User[]>('SELECT * FROM wp_users');
        return rows;
    },

    findById: async (id: number) => {
        const [rows] = await pool.query<User[]>('SELECT * FROM wp_users WHERE id = ? ', [id]);
        return rows[0] || null
    },

    create: async (data: userCreated) => {

        const fecha = new Date().toISOString();

        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO wp_users
        (user_login, user_pass, user_nicename, user_email,
        user_url,user_registered, user_activation_key,
        user_status, display_name)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            data.user_login,
            data.user_pass,
            data.user_nicename ?? data.user_login,
            data.user_email,
            data.user_url ?? '',
            data.user_registered ?? fecha,
            data.user_activation_key ?? '',
            data.user_status ?? '0',
            data.display_name ?? data.user_login,
        ])
        return result;
    }


}