import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pessoa = sequelize.define(
  "pessoa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_completo: {
      type: DataTypes.STRING,
    },
	email: {
      type: DataTypes.STRING,
    },
	data_aniversario: {
      type: DataTypes.DATE,
    },
	cpf: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
