const { defaultSkip } = require("express-winston");

import { database } from "../models/database";
import { Op } from "sequelize";
class ProdutoService {
  async findById(id) {
    const produto = await database.models.Produto.findByPk(id);
    return produto ? produto : {};
  }
  async deleteById(id) {
    const deleted = await database.models.Produto.destroy({ where: { id: id } });
    return deleted;
  }
  async findAll() {
    const result = await database.models.Produto.findAll();
    return result;
  }
  async save(produto) {
    let result = produto;
    if (produto) {
      if (produto.id && produto.id > 0) {
        result = await database.models.Produto.update(produto, {
          where: {
            id: produto.id,
          },
        });
      } else {
        result = await database.models.Produto.create(produto);
      }
      return result;
    }
  }
}
export const produtoService = new ProdutoService();
