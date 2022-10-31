import { Signup, SigunpAdmin, UpdateId, User } from "../models/types";
import { BaseDataBase } from "./BaseDataBase";

export class UserBaseDataBase extends BaseDataBase {
    createsignup = async (input:any) =>{
        try {
            await BaseDataBase.connection("users")
            .insert({
                id:input.id,
                name:input.name,
                email:input.email,
                password:input.pass,
                role:input.role
            })
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }


    
    loginDB = async (index:User) => {
        try {
           await BaseDataBase.connection("users")
            .where({email:index.email,
                    password:index.password,
                    role:index.role
            })
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    getProfile= async (id:string)=>{
        try {
            const result = await BaseDataBase.connection("users")
            .select("*")
            .where(id, "id")
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    getProfileById= async (id:string)=>{
        try {
            const result = await BaseDataBase.connection("users")
            .select("users.id")
            .where({id})
            return result[0].id
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    getRoleProfile = async (id:string) =>{
        try {
            console.log("id", id)
            const result = await BaseDataBase.connection("users")
            .select("users.role")
            .where({id})
            console.log("result",result[0].role)
            return result[0].role
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);

        }
       
    }
    getAllUsers = async () =>{
        try {
            const result = await BaseDataBase.connection("users")
            .select("*")
            return result
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);

        }
    }
    updateProfile = async (index:UpdateId) =>{
        try {
            const result = await BaseDataBase.connection("users")
            .update({
                name:index.name,
                email:index.email,
                password:index.password
            })
            .where({id:index.id})
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);

        }
    }
    createAdmin = async (index:SigunpAdmin):Promise<void>=>{
        await BaseDataBase.connection("admin")
        .insert({
            id:index.id,
            name:index.name,
            email:index.email,
            password:index.password
        })
    }

    loginAdmin = async (index:User) => {
        try {
           await BaseDataBase.connection("admin")
            .where({
                email:index.email,
                password:index.password
            })
            
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}