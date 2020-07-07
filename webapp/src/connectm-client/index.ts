import AppReducer from "./redux/reducer";
import rootSaga from "./saga/index";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(AppReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
