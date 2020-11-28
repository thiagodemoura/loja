import { Model } from "sequelize";


export default class LojaProduto extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                loja_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    references: { model: 'lojas', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                produto_id: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    references: { model: 'produtos', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                quantidade_minima: {
                    type: DataTypes.BIGINT,
                    allowNull: false,    
                },
                quantidade: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                
            },
            {
                sequelize: sequelize,
                modelName: "lojas_produto",
              }
        );
        
    }
}
