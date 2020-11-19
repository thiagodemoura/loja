const { defaultSkip } = require("express-winston");

import { database } from "../models/database";
import { Op } from "sequelize";
class LojaService {
  async findById(id) {
    const loja = await database.models.Loja.findByPk(id);
    return loja ? loja : {};
  }
  async deleteById(id) {
    const deleted = await database.models.Loja.destroy({ where: { id: id } });
    return deleted;
  }
  async findAll() {
    const result = await database.models.Loja.findAll();
    return result;
  }
  async save(loja) {
    let result = loja;
    if (loja) {
      if (loja.id && loja.id > 0) {
        result = await database.models.Loja.update(loja, {
          where: {
            id: loja.id,
          },
        });
      } else {
        result = await database.models.Loja.create(loja);
      }
      return result;
    }
  }
}
export const lojaService = new LojaService();
