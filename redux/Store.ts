import {combineReducers, configureStore} from '@reduxjs/toolkit';
import historyReducer from './reducers/History.ts';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  history: historyReducer,
});

const configuration = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};
const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger);
  },
});

export default store;
export const persistor = persistStore(store);
