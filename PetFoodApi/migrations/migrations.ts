import { BaseDataBase } from "../src/data/BaseDataBase";
export class Tables extends BaseDataBase{

    createTables = () =>{
        try {
            BaseDataBase.connection.raw(`
            CREATE TABLE users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR (255) NOT NULL UNIQUE,
                password VARCHAR (255) NOT NULL 
            );

            CREATE TABLE products (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                price FLOAT NOT NULL,
                quantity INT NOT NULL
            );

            CREATE TABLE description(
                description VARCHAR(255) NOT NULL,
                id_products VARCHAR(255),
                FOREIGN KEY (id_products) REFERENCES products (id)
                )
            `)
            
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }
}
