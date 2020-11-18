import { produtosConstantes } from '../constantes';
import { history } from "../helpers";
import ProdutoModel from "../models/Produto.Model";


class ProdutoController {
    carregarBusca(id) {
        return {
            type: produtosConstantes.CARREGAR_BUSCAS_PRODUTO,
        };
    }
    buscarProduto() {
        let lista = [
            {
                id: 1,
                modelo: "DELL",
                serial: 12345,
                descricao: "I5 / 16GB RAM / SSD 125",
                status: "Disponivel",
                local: "Sala Servidores",
                quantidade: 3,
                observacoes: "ótimo estado",
            },
        ];
        return {
            type: produtosConstantes.BUSCAR_PRODUTOS,
            payload: lista,
        };
    }
    salvarProduto(produto) {
        return (dispatch, getState) => {
            let result = new Promise((res, err) => {
                res(produto);
            });

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
    carregarManutencaoProduto(id) {
        return (dispatch, getState) => {
            let result = new Promise((res, err) => {
                let produto = null;
                if (id === 1) {
                    produto = {
                        id: 1,
                        modelo: "DELL",
                        serial: 12345,
                        descricao: "I5 / 16GB RAM / SSD 125",
                        status: "Disponivel",
                        local: "Sala Servidores",
                        quantidade: 3,
                        observacoes: "ótimo estado",
                    };
                } else {
                    produto = new ProdutoModel();
                }
                res(produto);
            });

            return dispatch({
                type: produtosConstantes.CARREGAR_MANUTENCAO_PRODUTO,
                payload: result,
            });
        };
    }

}

export const produtoController = new ProdutoController();