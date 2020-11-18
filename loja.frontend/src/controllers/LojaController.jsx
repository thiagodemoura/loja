import { lojasConstantes } from "../constantes";
import { history } from "../helpers";
import LojaModel from "../models/Loja.Model";
import FetchUtils from "../utils/Fetch.Utils"
class LojaController {

  carregarBusca(id) {
    let promise = FetchUtils.get("http://localhost:4000/api/loja");
    return {
      type: lojasConstantes.CARREGAR_BUSCAS_LOJAS,
      payload: promise,
    };
  }
  buscarLoja() {
    let promise = FetchUtils.get("http://localhost:4000/api/loja");
    return {
      type: lojasConstantes.BUSCAR_LOJAS,
      payload: promise,
    };
  }

  salvarLoja(loja) {
    return (dispatch, getState) => {
      let result = FetchUtils.post("http://localhost:4000/api/loja",loja);
      

      return dispatch({
        type: lojasConstantes.SALVAR_LOJAS,
        payload: result,
      }).then((res) => {
        history.push("/loja");
      });
    };
  }
  editarLoja(id) {
    history.push(`/loja/${id}`);
  }
  carregarManutencao(id) {
    return (dispatch, getState) => {
      let result = new Promise((res, err) => {
        let loja = null;
        if (id === 1) {
          loja = {
            id: 1,
            nome: "IA",
            cnpj: "323456789",
            rua: "Avenida Washington Soares",
            bairro: "Edson Queiroz",
            numero: 909,
            telefone: "(85) 3216-7800",
          };
        } else {
          loja = new LojaModel();
        }
        res(loja);
      });

      return dispatch({
        type: lojasConstantes.CARREGAR_MANUTENCAO_LOJAS,
        payload: result,
      });
    };
  }
}

export const lojaController = new LojaController();
