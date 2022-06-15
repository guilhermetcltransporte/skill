import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "skill", // db name,
  "skill", // username
  "@Rped94ft", // password
  {
    host: "gruposkill.postgres.database.azure.com",
    dialect: "postgres",
	dialectOptions: {
	  ssl: true
	}
  }
);
