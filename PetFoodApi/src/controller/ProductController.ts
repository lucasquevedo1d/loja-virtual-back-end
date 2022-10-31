import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { BuyProducts, DeleteProduct, ProductinputDTO } from "../models/types";

export class ProductController{
    createProduct = async (req:Request, res:Response) =>{
        try {
            const { name, price,  description, image, total_quantity, user_id, role } = req.body 
            const auth = req.headers.authorization as string

            const input:ProductinputDTO ={
                auth,
                name,
                price,
                description,
                image,
                totalQuantity:total_quantity,
                role,
                user_id
            }
            await new ProductBusiness().product(input)

            res.status(201).send({message:"product added successfully"})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})
        }
    }

    getProduct = async (req:Request, res:Response) =>{
        try {
            const auth = req.headers.authorization as string
           const result = await new ProductBusiness().getAllProduct(auth)


            res.status(200).send({message:result})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})

        }
    }

    buyProduct = async (req:Request, res:Response) =>{
        try {

        const auth = req.headers.authorization as string
        const {name_product, product_quantity} = req.body
            console.log("buyController",name_product, product_quantity)
        const newBuyProducts:BuyProducts ={
            name_product,
            product_quantity,
            auth
        }

        const result = await new ProductBusiness().buyProductBusiness(newBuyProducts)
        res.status(200).send({message:"Compra realizada com sucesso!", result:result})


        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})

        }
    }

    deleteProduct  = async (req:Request, res:Response) =>{
        try {
            const {id, role} = req.body

            const auth = req.headers.authorization as string

            const index:DeleteProduct={
                id,
                auth,
                role
            }

            
            await new ProductBusiness().delete(index)
            res.status(202).send({message:"Produto deletado com sucesso!"})
        } catch (error:any) {
            res.status(400).send({message:error.message || error.sqlMessage})

        }
    }
}