import { produtoService } from "../services/produto.service";
import winston from "winston";
export default class ProdutoController {
  constructor(app) {
    // Pesquisar por ID
    app.route("/api/produto/:id").get(this.findById);
    // Adicionar uma nova loja
    app.route("/api/produto").post(this.save);
    // Pesquisar tudo
    app.route("/api/produto").get(this.findAll);
    //Apagar Registro
    app.route("/api/produto/:id").delete(this.deleteById);
    app.route("/api/produto/search/:model").get(this.findByModel);
    
  }


  async findById(req, res) {
    const { id } = req.params;
    const produto = await produtoService.findById(id);
    res.json(produto.dataValues);
  }



  async findByModel(req, res) {
    const { model } = req.params;
    const produto = await produtoService.findByModel(model);
    res.json(produto.dataValues);
  }

  async deleteById(req, res) {
    const { id } = req.params;
    produtoService
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
      const produto = await produtoService.save(req.body);
      res.send({ result: true });
    } catch (error) {
      res.status(400).send({ error: "Falha no Registro " });
    }
  }


  async findAll(req, res) {
    const result = await produtoService.findAll();
    res.send(result);
  }
}
