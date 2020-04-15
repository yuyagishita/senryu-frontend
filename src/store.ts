import { createStore, combineReducers } from 'redux';
import { hogeReducer, HogeState } from './states/hogeState';
import { composeWithDevTools } from 'redux-devtools-extension';

export type AppState = {
  hoge: HogeState
};

const store = createStore(
  combineReducers<AppState>({
    hoge: hogeReducer
  }), composeWithDevTools()
);

export default store;
