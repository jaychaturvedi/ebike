import AppReducer from "./redux/reducer";
import rootSaga from "./saga/index";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

// function saveToLocalStorage(state: any) {
//     try {
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('state', serializedState)

//     } catch (e) {
//         console.log(e);
//     }
// }

// function loadFromLocalStorage() {
//     try {
//         const serializedState = localStorage.getItem('state')
//         if (serializedState === null) return undefined
//         return JSON.parse(serializedState)
//     } catch (e) {
//         console.log(e);
//         return undefined
//     }
// }

// const persistedState = loadFromLocalStorage()
const store = createStore(AppReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
  // other store enhancers if any
));
// store.subscribe(() => saveToLocalStorage(store.getState()))

sagaMiddleware.run(rootSaga);

export default store;
