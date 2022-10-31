import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDataBase } from "../data/BaseDataBase";
import { getAllUsers, GetProfile, Signup, Update, User } from "../models/types";
import { Authenticator } from "../services/Authenticator";

export class UserController extends BaseDataBase {
    signupPeople = async(req:Request, res:Response) =>{
       try {
        const {name, email, password, role} = req.body

        const input:Signup={
            name,
            email,
            password,
            role
        }
        const token = new Authenticator().generateToken({password})
        await new UserBusiness().signup(input)
        res.status(201).send({message:"Cadastro realizado com sucesso!", token})
       } catch (error:any) {
        res.status(400).send({message:error.message})
       } 


    }

    login = async (req:Request, res:Response) =>{
        try {
            const {email, password, role} = req.body

            const input:User ={
                email,
                password,
                role
            }

            const token = new Authenticator().generateToken({password})

            await new UserBusiness().loginB(input)
            res.status(200).send({message:"Logado com sucesso!", Token:token})
        } catch (error:any) {
            res.status(400).send({message:error.message})
        }
    }

    getProfile = async (req:Request, res:Response) =>{
        try {

            const auth = req.headers.authorization as string
            const id = req.params as any

            const input:getAllUsers ={
                id,
                auth
            }
           const result = await new UserBusiness().profile(input) 
            res.status(200).send({message:result})
        } catch (error:any) {
            res.status(200).send({message:error.message || error.sqlMessage});
            
        }
    }

    getAllUsers = async (req:Request, res:Response) =>{
        try {
            const auth = req.headers.authorization as string
            const id = req.body
            const input:getAllUsers={
                id,
                auth
            }

            const result = await new UserBusiness().allProfile(input)
            res.status(202).send({message:result})
        } catch (error:any) {
            res.status(200).send({message:error.message || error.sqlMessage});

        }
    }

    updateProfile = async (req:Request, res:Response) =>{
        try {
            const {id, name, email, password} = req.body
            const auth = req.headers.authorization as string
            const input:Update ={
                id,
                name,
                email,
                password,
                auth
            }

            const result = await new UserBusiness().update(input)
            res.status(200).send({message:"autalização realizada com sucesso!", result:result})
        } catch (error:any) {
            res.status(200).send({message:error.message || error.sqlMessage});

        }
    }
}