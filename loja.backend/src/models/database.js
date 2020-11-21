import { Sequelize, DataTypes } from "sequelize";
import Loja from "./loja";
import Produto from "./produto";
import mysql from "mysql2/promise";
import configDatabase from "../config/database.config";
import winston from "winston";

class Database {
  constructor() {
    const env = process.env.NODE_ENV || "development";
    winston.info(`Running environment ${env}`);
    const config = configDatabase[env];
    this.sequelize = null;
    this.models = null;
    this.prepareDatabaseEnvironment(config);
  }
  prepareDatabaseEnvironment(config) {
    winston.info(`Prepare Database ${config.database}`);
    if (config.use_env_variable) {
      this.sequelize = new Sequelize(
        process.env[config.use_env_variable],
        config
      );
    } else {
      this.sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
      );
    }
    this.models = {
      Loja: Loja.init(this.sequelize, DataTypes),
      Produto: Produto.init(this.sequelize, DataTypes),
    };
    Object.values(this.models).forEach((model) => model.sync());
    // Run `.associate` if it exists,
    // ie create relationships in the ORM
    Object.values(this.models)
      .filter((model) => typeof model.associate === "function")
      .forEach((model) => model.associate(this.dels));
  }

  async createDatabase(config) {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  }
}
export const database = new Database();
