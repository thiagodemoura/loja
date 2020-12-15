import { lojasConstantes, thrunkConstantes } from "../constantes";
import LojaModel from "../models/Loja.Model";
import { findlastindex } from "lodash.findlastindex";
import ProdutoModel from "../models/Produto.Model";

export function loja(
  state = {
    lista: [],
    nome: "",
    listaProdutos: [],
    selectedProduto: { produto: new ProdutoModel(), quantidadeMinima: 0, total: 0 },
    selectedProdutoList: [],
    entidade: new LojaModel(),
  },
  action
) {
  switch (action.type) {
    case lojasConstantes.CARREGAR_BUSCAS_LOJAS + thrunkConstantes._FULFILLED: {
      return { ...state, lista: action.payload };
    }
    case lojasConstantes.CARREGAR_LISTAGEM_PRODUTOS + thrunkConstantes._FULFILLED: {
      let data = action.payload;
      const values = data ? data : [];
      return {
        ...state, listaProdutos: values.map((value) => {
          return { value: value.id, label: value.modelo }
        })
      };
    }
    case lojasConstantes.BUSCAR_LOJAS + thrunkConstantes._FULFILLED: {
      return { ...state, lista: action.payload };
    }
    case lojasConstantes.SALVAR_LOJAS + thrunkConstantes._FULFILLED: {
      return { ...state, entidade: new LojaModel() };
    }
    case lojasConstantes.CARREGAR_MANUTENCAO_LOJAS +
      thrunkConstantes._FULFILLED: {
        let entidade = action.payload;
        return { ...state, entidade };

      } case lojasConstantes.ADICIONAR_PRODUTO_LOJA + thrunkConstantes._FULFILLED: {
        let produto = action.payload;
        let entidade = state.entidade;
        let produtos = entidade.produtos;
        const pos = findlastindex(produtos, (prod) => { return prod.id === produto.id });
        if (pos > -1) {
          produtos[pos] = produto;
        } else {
          produtos.push(produto);
        }
        let loja = Object.assign({}, state.entidade, { produtos })
        return { ...state, entidade: loja };

      } case lojasConstantes.REMOVER_PRODUTO_LOJA + thrunkConstantes._FULFILLED: {
        let produto = action.payload;
        let entidade = state.entidade;
        let produtos = entidade.produtos;
        const pos = findlastindex(produtos, (prod) => { return prod.id === produto.id });
        if (pos > -1) {
          produtos = produtos.splice(pos);
        }
        let loja = Object.assign({}, state.entidade, { produtos })
        return { ...state, entidade: loja };
      }
    default:
      return state;
  }
}
