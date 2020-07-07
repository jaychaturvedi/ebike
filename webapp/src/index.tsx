import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.scss';
import App from './App';
import { withRouter, RouteComponentProps } from "react-router";
import * as serviceWorker from './serviceWorker';
import store from './connectm-client';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
