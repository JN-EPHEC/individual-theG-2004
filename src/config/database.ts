import { Sequelize } from "sequelize";

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/config/database.sqlite',
    logging: false, // désactive les logs SQL dans la console 
});

export default sequelize;