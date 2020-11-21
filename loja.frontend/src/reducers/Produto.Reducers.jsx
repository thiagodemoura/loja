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
      case produtosConstantes.CARREGAR_BUSCAS_PRODUTOS + thrunkConstantes._FULFILLED: {
        return { ...state, lista: action.payload };
      }
      case produtosConstantes.BUSCAR_PRODUTOS + thrunkConstantes._FULFILLED: {
        return { ...state, lista: action.payload };
      }
      case produtosConstantes.SALVAR_PRODUTOS + thrunkConstantes._FULFILLED: {
        return { ...state, entidade: new ProdutoModel() };
      }
      case produtosConstantes.CARREGAR_MANUTENCAO_PRODUTOS +
        thrunkConstantes._FULFILLED: {
        let entidade = action.payload;
        return { ...state, entidade };
      }
      default:
        return state;
    }
  }
  