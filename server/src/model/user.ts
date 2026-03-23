import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';


class User extends Model {}; // Définition du modèle User en étendant la classe Model de Sequelize


User.init(
    // Initialisation du modèle avec les champs et les options
    {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // passe l'instance de connexion à Sequelize
        modelName: 'User',
    },
);


export default User; // Exporte le modèle pour l'utiliser dans d'autres parties de ton application