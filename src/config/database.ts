import { Sequelize } from "sequelize";
import { env } from "./env.ts";

import { logger } from "./logger.ts";
export const sequelize = new Sequelize({
    dialect: 'mysql', // npm install mysql2
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },

    logging: ((msg) => logger.debug(msg))

})

export async function connectDatabase(): Promise<void> {
    try{
        await sequelize.authenticate();
        logger.info('Conexion exitosa a mysql')
    }catch (error){
        logger.error(`Error al cargar la base de datos ${error}`)
    }
}
