import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {
  routerMiddleware,
  ConnectedRouter
} from 'connected-react-router/immutable';
import Immutable from 'immutable';
//import persistState from 'redux-localstorage'
import thunk from 'redux-thunk';
import createRootReducer from './store/reducers/index';

const history = createBrowserHistory();

const initialState = Immutable.Map();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(
    //persistState(/*paths, config*/), //数据持久化，暂时没有调通，备用状态
    applyMiddleware(routerMiddleware(history), thunk)
  )
);

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );

render(App);

registerServiceWorker();
