import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Auth} from './Auth';
import {Products} from "./Products";
import { createStore } from 'redux';
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = (state:any) => {
  return state;
}

// const initialState = { tech: "react " };
// const store = createStore(reducer, initialState,    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth/>
        {/*<Products/>*/}
      </header>
    </div>
  );
}

export default App;
