import * as SecureStorage from "./secure-storage";
import AppReducer from "./redux/reducer";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootSaga from "./redux/saga";
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger));
let persistor = persistStore(store as any);

sagaMiddleware.run(rootSaga);

export {
    store,
    persistor,
    SecureStorage
};