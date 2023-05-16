import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { reducers, reducerPersistWhiteList, reducerPersistBlackList } from './modules';

const persistConfig = {
    key: 'root',
    storage: storage,
    whiteList: reducerPersistWhiteList,
    blackList: reducerPersistBlackList
}

const persistedReducer = persistReducer(persistConfig, combineReducers({...reducers}));

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {store, persistor}
