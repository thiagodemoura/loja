import { lojasConstantes } from "../constantes";
import { history } from "../helpers";
import LojaModel from "../models/Loja.Model";
import FetchUtils from "../utils/Fetch.Utils";
class LojaController {
  carregarBusca() {
    let promise = FetchUtils.get("/api/loja");
    return {
      type: lojasConstantes.CARREGAR_BUSCAS_LOJAS,
      payload: promise,
    };
  }
  updateEntity(obj) {
    return {
      type: lojasConstantes.ATUALIZAR_ATRIBUTOS,
      payload: obj,
    };
  }
  buscarLoja() {
    let promise = FetchUtils.get("/api/loja");
    return {
      type: lojasConstantes.BUSCAR_LOJAS,
      payload: promise,
    };
  }
  buscarProdutoPorModelo(modelo) {
    return FetchUtils.get("/api/loja/produto/search/" + modelo);

  }
  selectProduto(produto) {
    return {
      type: lojasConstantes.SELECIONAR_PRODUTO,
      payload: produto,
    };
  }

  salvarLoja(loja) {
    return (dispatch, getState) => {
      let result = FetchUtils.post("/api/loja", loja);

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

  apagarLoja(id) {
    let that = this;
    return (dispatch, getState) => {
      let result = FetchUtils.delete(`/api/loja/${id}`);
      return dispatch({
        type: lojasConstantes.APAGAR_LOJAS,
        payload: result,
      }).then((result) => {
        return dispatch(that.carregarBusca());
      });
    };
  }
  carregarManutencao(id) {
    return (dispatch, getState) => {
      let result = null;
      if (id > 0) {
        result = FetchUtils.get(`/api/loja/${id}`);
      } else {
        result = new Promise((res, err) => {
          res(new LojaModel());
        });
      }

      return dispatch({
        type: lojasConstantes.CARREGAR_MANUTENCAO_LOJAS,
        payload: result,
      });
    };
  }
  addToList() {
    return {
      type: lojasConstantes.ADICIONAR_PRODUTO_LOJA,
    };
  }
  removeFromList() {
    return {
      type: lojasConstantes.REMOVER_PRODUTO_LOJA,
    };
  }

  onSelect(rows, isSelected) {
    return {
      type: lojasConstantes.SELECT_PRODUCT_ROWS,
      payload: { rows, isSelected }
    };
  }
}

export const lojaController = new LojaController();
