import { lojaService } from "../services/loja.service";
import winston from "winston";
export default class LojaController {
  constructor(app) {
    // Pesquisar por ID
    app.route("/api/loja/:id").get(this.findById);
    // Adicionar uma nova loja
    app.route("/api/loja").post(this.save);
    // Pesquisar tudo
    app.route("/api/loja").get(this.findAll);
    //Apagar Registro
    app.route("/api/loja/:id").delete(this.deleteById);
  }

  async findById(req, res) {
    const id = req.params.id;
    const loja = await lojaService.findById(id);
    res.json(loja.dataValues);
  }

  async deleteById(req, res) {
    const id = req.params.id;
    lojaService
      .deleteById(id)
      .then(() => {
        res.json({ result: true });
      })
      .catch((err) => {
        winston.error(err);
        res.status(500).json({ result: false });
      });
  }

  async save(req, res) {
    try {
      const loja = await lojaService.save(req.body);
      res.send({ result: true });
    } catch (error) {
      res.status(400).send({ error: "Falha no Registro " });
    }
  }

  async findAll(req, res) {
    const result = await lojaService.findAll();
    res.send(result);
  }
}
