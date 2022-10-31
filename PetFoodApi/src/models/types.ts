export enum SignupRole{
    ADMIN ="admin",
    USER ="user"
}

export type Signup={
    name:string,
    email:string,
    password:string
    role:SignupRole
}

export type SigunpAdmin={
    id:string,
    name:string,
    email:string,
    password:string
}
export type User ={
    email:string,
    password:string,
    role:SignupRole
}

export type getAllUsers={
    auth:string,
    id:string
}

export type Product={
    name:string,
    price:number,
    quantity:number,
    description:string,
    image:string
}

export type BuyProducts={
    name_product:string,
    product_quantity:number,
    auth:string
}


export type ProductinputDTO={
    name:string,
    price:number,
    description:string,
    image:string,
    auth:string,
    totalQuantity:number,
    role:SignupRole.ADMIN,
    user_id:string
}

export type responseBuyTicket = {
    id:string,
    name:string,
    price:number,
    total_quantity:number,
    sold_quantity:number
}

export type BusinessProducts={
    id:string,
    name:string,
    price:number,
    totalQuantity:number,
    available:number,
    description:string,
    image:string,
    user_id:string,
    role:SignupRole.ADMIN
}

export type GetProfile ={
    name:string,
    email:string
}

export type Update ={
    id:string,
    name:string,
    email:string,
    password:string,
    auth:string
}
export type UpdateId ={
    id:string,
    name:string,
    email:string,
    password:string,
}

export type DeleteProduct ={
    id:string,
    auth:string,
    role:SignupRole.ADMIN
}