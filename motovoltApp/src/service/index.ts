import * as SecureStorage from "./secure-storage";
import AppReducer from "./redux/reducer";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootSaga from "./redux/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(AppReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export {
    store,
    SecureStorage
};