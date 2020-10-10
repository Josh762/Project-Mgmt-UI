import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {composeWithDevTools} from "redux-devtools-extension"; // defaults to localStorage for web
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistanceReducer = persistReducer(
    persistConfig,
    rootReducer
)


export const store = createStore(
    persistanceReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export const persistor = persistStore(store);

