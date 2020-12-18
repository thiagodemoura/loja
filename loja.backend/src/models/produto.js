import { Model } from "sequelize";
import Loja from "./loja";


export default class Produto extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        modelo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        serial: {
          type: DataTypes.STRING,
          allowNull: false
        },
        descricao: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        local: {
          type: DataTypes.STRING,
          allowNull: false
        },
        observacoes: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize: sequelize,
        modelName: "produto", // We need to choose the model name
      }
    );
  }

  static associate() {
    return this.associations = {
      lojas: Produto.belongsToMany(Loja, {
        foreignKey: 'loja_id',
        through: 'lojas_produtos', as: 'lojas'
      })
    };
  }


}