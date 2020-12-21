import { lojasConstantes, thrunkConstantes } from "../constantes";
import LojaModel from "../models/Loja.Model";
import findlastindex from "lodash.findlastindex";
import ProdutoModel from "../models/Produto.Model";
const objectPath = require("object-path");



export function loja(
  state = {
    lista: [],
    nome: "",
    listaProdutos: [],
    selectedProduto: { produto: new ProdutoModel(), quantidadeMinima: 1, total: 1 },
    selectedProdutoList: [],
    entidade: new LojaModel(),
  },
  action
) {
  switch (action.type) {
    case lojasConstantes.CARREGAR_BUSCAS_LOJAS + thrunkConstantes._FULFILLED: {
      return { ...state, lista: action.payload };
    }
    case lojasConstantes.SELECIONAR_PRODUTO: {
      const selectedProduto = Object.assign({}, state.selectedProduto, { produto: action.payload })
      return { ...state, selectedProduto };
    }

    case lojasConstantes.ATUALIZAR_ATRIBUTOS: {
      let result = Object.assign({}, state);
      Object.keys(action.payload).forEach((att) => {
        const value = action.payload[att]
        objectPath.set(result, att, value)
      })

      return result
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

      }
    case lojasConstantes.ADICIONAR_PRODUTO_LOJA: {
      let produto = state.selectedProduto;
      let entidade = state.entidade;
      let produtos = entidade.produtos ? entidade.produtos : [];
      const pos = findlastindex(produtos, { id: produto.id });
      if (pos > -1) {
        produtos[pos] = produto;
      } else {
        produtos.push(produto);
      }
      let loja = Object.assign({}, state.entidade, { produtos })
      return { ...state, entidade: loja, selectedProduto: { produto: new ProdutoModel(), quantidadeMinima: 0, total: 0 } };
    }

    case lojasConstantes.REMOVER_PRODUTO_LOJA: {
      let produto = state.selectedProduto;
      let entidade = state.entidade;
      let produtos = entidade.produtos ? entidade.produtos : [];
      const pos = findlastindex(produtos, { id: produto.id });
      if (pos > -1) {
        produtos = produtos.splice(pos);
      }
      let loja = Object.assign({}, state.entidade, { produtos })
      return { ...state, entidade: loja, selectedProduto: { produto: new ProdutoModel(), quantidadeMinima: 0, total: 0 } };
    }
    case lojasConstantes.SELECT_PRODUCT_ROWS: {
      let selected = [];
      if (action.payload.rows.length > 0) {
        selected = action.payload.rows;
      } else {
        selected = [];
      }

      return { ...state, selectedProdutoList: selected };
    }
    default:
      return state;
  }
}
