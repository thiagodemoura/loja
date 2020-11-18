import { combineReducers } from "redux";
import { loja } from "./Loja.Reducers";
import {produto} from "./Produto.Reducers";

const rootReducer = combineReducers({
    loja,
    produto
})

export default rootReducer;