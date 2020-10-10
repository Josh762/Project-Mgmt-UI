import React from 'react';
import './App.css';
import {Auth} from './Auth';
import {
    BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


const reducer = (state:any) => {
  return state;
}

// const initialState = { tech: "react " };
// const store = createStore(reducer, initialState,    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
function App() {
  return (
      <Router>
          <Switch>
              <Route path='/signin'>
                <SignIn></SignIn>
              </Route>
              <Route path='/signup'>
                <SignUp></SignUp>
              </Route>
              <Route path='/home'>
                <Home></Home>
              </Route>
          </Switch>
      </Router>

  );
}

export default App;
