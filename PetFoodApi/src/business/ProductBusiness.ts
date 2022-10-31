import { BaseDataBase } from "../data/BaseDataBase";
import { ProductBaseDataBase } from "../data/ProductsBaseDataBase";
import { UserBaseDataBase } from "../data/UserBaseDataBase";
import { BusinessProducts, BuyProducts, DeleteProduct, ProductinputDTO, SignupRole } from "../models/types";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ProductBusiness extends BaseDataBase{
    product = async (input:ProductinputDTO) =>{
        try {
            const {name, price, totalQuantity, description, image, auth, user_id, role} = input
            if(!name || !price || !totalQuantity ||!description || !image ){
                throw new Error("fill in all fields");
            }

            const compareToken = new Authenticator().getTokenData(auth)

            if(!compareToken){
                throw new Error("You don't have authorization");
            }
            
            const id = new IdGenerator().generate()
            const idUser =  await new UserBaseDataBase().getProfileById(user_id)
            console.log("user_id", user_id)

            const getRole = await new UserBaseDataBase().getRoleProfile(user_id)
            if(getRole !== SignupRole.ADMIN){
                throw new Error("Apenas administradores podem criar novos produtos");
            }

            
            const index:BusinessProducts={
                id,
                name,
                price,
                totalQuantity,
                available:totalQuantity,
                description,
                image,
                user_id:idUser,
                role:getRole
            }
            console.log("index",index.user_id[0])
          await new ProductBaseDataBase().createProducts(index)  

        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
    getAllProduct = async (input:string) =>{
        const auth = input
        const token = new Authenticator().getTokenData(auth)
        if(!token){
            throw new Error("You don't have authorization");
        }

    
        const result = await new ProductBaseDataBase().getProduct()
        return result
    }

    buyProductBusiness = async (index:BuyProducts) =>{
        const {name_product, product_quantity, auth} = index
        console.log(product_quantity)

        if(!auth){
            throw new Error("Invalid entry. 'Token' is required.");
        }
        if(!name_product || !product_quantity){
            throw new Error("purchase not made");
        }

        const token = new Authenticator().getTokenData(auth)

        if(!token){
            throw new Error("You need to be a user to buy");
        }

        console.log("name",name_product)
        const productDB = await new ProductBaseDataBase().buyProductByName(name_product)
        const totalQuantity = productDB.total_quantity
        if(!productDB){
            throw new Error("Product not found, make sure name product is correct.");
        }
        
        if (product_quantity > totalQuantity) {
                throw new Error(`You are trying to buy a quantity of non-existent. There's only ${totalQuantity} ticket's available.`)
            }
        
        if(productDB.total_quantity < product_quantity){
            throw new Error(`There are only ${productDB.total_quantity} products`)
        }

                   
        const quantityUpdate = product_quantity + productDB.sold_quantity
        const productAvaliable = productDB.total_quantity - productDB.sold_quantity
        await new ProductBaseDataBase().updateProduct(quantityUpdate, totalQuantity,productAvaliable ,name_product)
    }

    delete = async (index:DeleteProduct) =>{
        const {id, auth, role} = index

        if(!id || !auth || !role){
            throw new Error("ERRO ao deletar produto, passe os dados corretamente")
        }

        const token = await new Authenticator().getTokenData(auth)

        if(!token){
            throw new Error("Você não possui autorização para deletar o produto");
        }
        if(role !== "admin"){
            throw new Error("Apenas administradores podem deletar produtos");
            
        }
        const getProduct = await new ProductBaseDataBase().getProduct()
        if(getProduct.length < 1){
            throw new Error("Não há produtos para deletar!");
        }

        await new ProductBaseDataBase().deleteProductById(id)


    }
}