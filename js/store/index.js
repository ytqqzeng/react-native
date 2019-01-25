import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

// 没加入redux-persist的代码
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const initialState = {
// }
// export default createStoreWithMiddleware(rootReducer, initialState);


const persistedReducer = persistReducer(persistConfig, rootReducer)
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const initialState = {
}
export const store = createStoreWithMiddleware(persistedReducer, initialState);
export const persistor  = persistStore(store)