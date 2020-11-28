import { Model } from "sequelize";
import Produto from "./produto";

export default class Loja extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        // Model attributes are defined here
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        }, 
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rua: {
          type: DataTypes.STRING,
          allowNull: false
        },
        bairro: {
          type: DataTypes.STRING,
          allowNull: false
        },
        numero: {
          type: DataTypes.STRING,
          allowNull: false
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize: sequelize,
        modelName: "loja", // We need to choose the model name

      }
    );
  }
  static associate(models) {
    return this.associations = {
      produtos: Loja.belongsToMany(Produto,{foreignKey:'loja_id', through:'lojas_produtos', as:'produtos'})
    };   
  }
}
