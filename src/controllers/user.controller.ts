import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios',error });
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
        res.status(500).json({ msg: 'Error al obtener usuario',error });
    }
};

export const createUser = async (req:Request,res:Response)=>{
    const {name , email} = req.body;

    if(!name || !email){
        res.status(400).json({
            error:"name y email son requeridos"
        });
        return
    }

    try {
        const result = await UserModel.create(name,email);
        res.status(201).json({id:result.insertId,name:name,email:email})
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                error:"Email ya registrado"
            })
            return;
        }
        res.status(500).json({
            msg:"Error al registrar usuario",
            error,
        })
    }
}