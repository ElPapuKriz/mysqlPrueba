import { Request, Response } from 'express';
import {  UserModel } from '../models/user.model';
import { userCreated } from '../types/userCreated.type';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuario', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name_student,lastname_student,email}: userCreated = req.body;

    if (!name_student || !lastname_student || !email) {
        res.status(400).json({
            error: "name_student, lastname_student and email are required",
        });
        return;
    }

    try {
        const newUser = await UserModel.create({ name_student,lastname_student,email });
        res.status(201).json(newUser);
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                error: "El usuario o email ya está registrado"
            });
            return;
        }
        res.status(500).json({
            msg: "Error al registrar usuario",
            error,
        });
    }
};
