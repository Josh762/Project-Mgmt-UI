import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import {PersistGate} from "redux-persist/integration/react"; // defaults to localStorage for web


import { store, persistor } from './redux/redux-config';

// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = createStore(rootReducer, composeWithDevTools(
//   applyMiddleware(thunk)
// ));

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
      </PersistGate>
  </Provider>,
  document.getElementById('root')
);
