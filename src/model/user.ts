// On remplace le require par un import
import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; // Importe ton instance de connexion

class User extends Model {}

User.init(
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
    sequelize, // On utilise l'instance importée
    modelName: 'User',
  },
);

export default User; // N'oublie pas d'exporter pour que server.ts puisse le lire