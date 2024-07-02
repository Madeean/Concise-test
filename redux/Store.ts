import {combineReducers, configureStore} from '@reduxjs/toolkit';
import historyReducer from './reducers/History.ts';

const rootReducer = combineReducers({
  history: historyReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
