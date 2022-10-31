export class Buy {

    constructor (
        private id: string,
        private name: string,
        private quantity: number,
        private userId: string
    ) {}

    public getId = (): string => {
        return this.id
    }

    public getProducQuantity = (): number => {
        return this.quantity
    }

    public getNameProduct = (): string => {
        return this.name
    }

    public getUserId = (): string => {
        return this.userId
    }

    static toBuyModel = (buy: any): Buy => {
        return new Buy (
            buy.id,
            buy.product_quantity,
            buy.name,
            buy.user_id
        )
    }
}