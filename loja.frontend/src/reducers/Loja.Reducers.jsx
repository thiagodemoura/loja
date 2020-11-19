import { lojasConstantes, thrunkConstantes } from "../constantes";
import LojaModel from "../models/Loja.Model";

export function loja(
  state = {
    lista: [],
    nome: "",
    entidade: new LojaModel(),
  },
  action
) {
  switch (action.type) {
    case lojasConstantes.CARREGAR_BUSCAS_LOJAS + thrunkConstantes._FULFILLED: {
      return { ...state, lista: action.payload };
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
    default:
      return state;
  }
}
