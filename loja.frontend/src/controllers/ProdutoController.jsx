import { produtosConstantes } from '../constantes';
import { history } from "../helpers";
import ProdutoModel from "../models/Produto.Model";
import FetchUtils from "../utils/Fetch.Utils";
class ProdutoController {
    carregarBusca() {
        let promise = FetchUtils.get("/api/produto");
        return {
            type: produtosConstantes.CARREGAR_BUSCAS_PRODUTOS,
            payload: promise,
        };
    }
    buscarProdutoPorModelo(modelo) {
        let promise = FetchUtils.get("/api/produto/search/" + modelo);
        return {
            type: produtosConstantes.BUSCAR_PRODUTOS,
            payload: promise,
        };
    }
    salvarProduto(produto) {
        return (dispatch, getState) => {
            let result = FetchUtils.post("/api/produto", produto);

            return dispatch({
                type: produtosConstantes.SALVAR_PRODUTOS,
                payload: result,
            }).then((res) => {
                history.push("/produto");
            });
        };
    }
    editarProduto(id) {
        history.push(`/produto/${id}`);
    }
    apagarProduto(id) {
        let that = this;
        return (dispatch, getState) => {
            let result = FetchUtils.delete(`/api/produto/${id}`);
            return dispatch({
                type: produtosConstantes.APAGAR_PRODUTOS,
                payload: result,
            }).then((result) => {
                return dispatch(that.carregarBusca());
            });
        };
    }

    carregarManutencaoProduto(id) {
        return (dispatch, getState) => {
            let result = null;
            if (id > 0) {
                result = FetchUtils.get(`/api/produto/${id}`);
            } else {
                result = new Promise((res, err) => {
                    res(new ProdutoModel());
                });
            }

            return dispatch({
                type: produtosConstantes.CARREGAR_MANUTENCAO_PRODUTOS,
                payload: result,
            });
        };
    }
}

export const produtoController = new ProdutoController();