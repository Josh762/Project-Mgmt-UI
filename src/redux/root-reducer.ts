import { combineReducers } from 'redux';
import {productsReducer} from "./modules/products";
import { userReducer } from './modules/user';

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
