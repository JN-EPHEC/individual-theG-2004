import { Sequelize } from "sequelize";

// 🔒 Fonction utilitaire pour vérifier les variables d'env
function getEnv(variable: string): string {
  const value = process.env[variable];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${variable}`);
  }
  return value;
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize({
      username: process.env.DB_USER || "postgres",
      password: getEnv("DB_PASSWORD"),
      database: process.env.DB_NAME || "postgres",
      host: getEnv("DB_HOST"),
      port: Number(process.env.DB_PORT || 5432),
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    });

export default sequelize;