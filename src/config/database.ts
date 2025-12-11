import { Sequelize } from "sequelize";
import { env } from "./env.ts";


export const sequelize = new Sequelize({
    dialect: 'mysql', // npm install mysql2
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    logging: false

});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a MySQL establecida');
    return true;
  } catch (error) {
    console.error(' Error conectando a MySQL:', error);
    return false;
  }
}
