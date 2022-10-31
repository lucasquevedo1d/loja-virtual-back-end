export class Product{
    constructor(
        private id:string,
        private productName:string,
        private price:number,
        private totalQuantity:number,
        private soldQuantity:number = 0
    ){}

    public getId = () =>{
        return this.id
    }

    public getProductName = () =>{
        return this.productName
    }

    public getPrice = () =>{
        return this.price
    }

    public getTotalQuantity = () =>{
        return this.totalQuantity
    }

    public getSoldQuantity = () =>{
        return this.soldQuantity
    }

    static toProductModel(product:any): Product{
        return new Product(
            product.id,
            product.product_name,
            product.price,
            product.total_quantity,
            product.sold_quantity
        )
    }
}