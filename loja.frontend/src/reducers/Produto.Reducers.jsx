import { produtosConstantes, thrunkConstantes } from '../constantes';
import ProdutoModel from "../models/Produto.Model";

export function produto(
    state = {
      lista: [],
      nome: "",
      entidade: new ProdutoModel(),
    },
    action
  ) {
    switch (action.type) {
      case produtosConstantes.CARREGAR_BUSCAS_PRODUTO: {
        return { ...state };
      }
      case produtosConstantes.BUSCAR_PRODUTOS: {
        return { ...state, lista: action.payload };
      }
      case produtosConstantes.SALVAR_PRODUTOS + thrunkConstantes._FULFILLED: {
        let lista = state.lista;
        lista.push(action.payload);
        return { ...state, lista };
      }
      case produtosConstantes.CARREGAR_MANUTENCAO_PRODUTO +
        thrunkConstantes._FULFILLED: {
        let entidade = action.payload;
        return { ...state, entidade };
      }
      default:
        return state;
    }
  }
  