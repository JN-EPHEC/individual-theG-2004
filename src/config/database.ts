import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";   

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false, // désactive les logs SQL dans la console 
});

export default sequelize;
export { DataTypes };