import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import rootReducer from "../reducers";

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    logger, // neat middleware that logs actions
    promise
  )
);
