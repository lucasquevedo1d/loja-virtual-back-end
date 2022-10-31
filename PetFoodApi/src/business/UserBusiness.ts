import { UserBaseDataBase } from "../data/UserBaseDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { getAllUsers, Signup, SignupRole, Update, UpdateId, User } from "../models/types";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseDataBase } from "../data/BaseDataBase";

export class UserBusiness extends BaseDataBase{
    signup = async (input:Signup) =>{
        try {
            const {name, email, password, role} = input

            if(!name ||!email || !password || !role){
                throw new Error("Please, fill in all the fiels!");
            }

            if (email.indexOf("@") === -1) {
                throw new Error("Invalid email!");
             }

            if (password.length < 6) {
                throw new Error("Invalid password!");
             }
             

            const id = new IdGenerator().generate();
            const hashPassword = new HashManager()
            const pass = hashPassword.hash(password)
            
            const inputId ={
                id,
                name,
                email, 
                pass, 
                role
            }

            await new UserBaseDataBase().createsignup(inputId)
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    loginB = async (input:User) =>{
        const {email, password, role} = input

        if(!email || !password || !role){
            throw new Error("fill in all fields");
        }
   
        if (email.indexOf("@") === -1) {
           throw new Error("Invalid email!");
           
        }

        const [compare] = await BaseDataBase.connection('users')
        .where({email})


        const comparePassword = new HashManager().compareHash(password, compare.password)

        if(!comparePassword){
            throw new Error("Invalid credentials");
        }

        const token = new Authenticator().generateToken({id:compare.id})
           const user = {
               email,
               password,
               role
           }

           
            await new UserBaseDataBase().loginDB(user)
            
            return token

    }
    profile = async(input:any) =>{
        const {id, auth} = input

       const compareToken = new Authenticator().getTokenData(auth)

        if(!compareToken){
            throw new Error("You don't have authorization");
        }

        if(!id) {
            throw new Error("Invalid credentials");
        }
        const result = await new UserBaseDataBase().getProfile(id)

        if(result.role !== SignupRole.ADMIN){
            throw new Error("Sem autorização");
            
        }
        const getProfile =  {
            id: result.id,
            name: result.name,
            email: result.email,
            role:result.role
        }

        return getProfile
    }

    allProfile = async (input:getAllUsers) =>{
        const {id, auth} = input

        if(!id || !auth){
            throw new Error("Passe todos os dados corretamente");
        }

        const token = await new Authenticator().getTokenData(auth)

        if(!token){
            throw new Error("Sem autorização para essa operação");        
        }
        
        const role = await new UserBaseDataBase().getProfile(id)
        console.log(role.role)
        if(role.role !== SignupRole.ADMIN){
            throw new Error("Não autorizado");
        }
        const result = await new UserBaseDataBase().getAllUsers()
        return result
    }

    update = async (index:Update) =>{
        const {id, name, email, password, auth} = index
        const token = await new Authenticator().getTokenData(auth)
        
        if(!token){
            throw new Error("Você não tem autorização para realizar mudanças nesse perfil!");
        }        

        const input:UpdateId ={
            id,
            name,
            email,
            password
        }    

        await new UserBaseDataBase().updateProfile(input)

        }
}