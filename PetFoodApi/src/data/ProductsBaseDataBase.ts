import { BusinessProducts, responseBuyTicket } from "../models/types";
import { BaseDataBase } from "./BaseDataBase";

export class ProductBaseDataBase extends BaseDataBase{
    createProducts = async (index:BusinessProducts) =>{
        try {
            console.log("indexCreate",index)
            const result = await BaseDataBase.connection("products")
            .insert({
                id:index.id,
                name:index.name,
                price:index.price,
                total_quantity:index.totalQuantity as number,
                available:index.available,
                description:index.description,
                image:index.image,
                user_id:index.user_id
            })
            console.log("resultCreate",result[0])
            return result[0] + 1
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }
    getProduct = async () =>{
        try {
            const result = await BaseDataBase.connection("products")
            .select("*")
            return result
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    buyProductByName = async (name:string): Promise <responseBuyTicket> =>{
        try {
            const result = await BaseDataBase.connection("products")
            .select("*")
            .where({name})
            return result[0]
           
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }
    
    updateProduct = async (quantityUpdate:number, availableQuantity:number, productAvaliable:number, name:string) =>{
        try {
            const result:any = await BaseDataBase.connection("products")
            .update({
                    sold_quantity: quantityUpdate,
                    total_quantity:availableQuantity,
                    available:productAvaliable
            })
            .where({name})
            return result
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    deleteProductById = async (id:string) =>{
      try {
        const result = await BaseDataBase.connection("products")
        .delete("*")
        .where({id})

        return result
      } catch (error:any) {
        throw new Error(error.message || error.sqlMessage);

      } 
    }
}