import { combineReducers } from 'redux';
import {productsReducer} from "./modules/products";
import { userReducer } from './modules/auth';

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
