import { lojaService } from "../services/loja.service";
import Loja from "../models/loja"
export default class LojaController {
  constructor(app) {
    // Pesquisar por ID
    app.route("/loja/:id").get(this.findById);
    // Adicionar uma nova loja
    app.route("/loja/:0").post(this.save);
    // Pesquisar tudo
    app.route("/loja/").get(this.findAll);
    app.route("").get("teste");


  }


  async findById(req, res) {
    const id = req.params.id;
    const loja = await lojaService.findById(id)
    res.json(loja);
  }

  async save(req, res) {
    try {
      const loja = await Loja.create(req.body);
      return res.send({ loja });
    } catch (error) {
      return res.status(400).send({ error: 'Falha no Registro ' })
    }

  }

  async findAll(req, res) {
    Loja.findAll().then(lojas => {
      res.send(lojas)
    })
  }
}
