import React from 'react'
import {Switch, Route,Redirect,BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import './App.scss';
import LoginPage from './pages/Auth/LoginPage'
import NotePage from './pages/Note/Notepage'
import RegistrationPage from './pages/Auth/RegistrationPage'
import  NavBar  from "./components/navbar/navbar";
import axios from 'axios'

import {
  AuthContextProvider,
  CategoriesContextProvider,
  ErrorsContext,

} from './context/index';

function App() {
  let token = localStorage.getItem('token');
  axios.defaults.headers.common.authorization = token ? JSON.parse(token) : '';

  if (token === 'undefined' || !token) {
    token = null;
  }

  const authenticated = () => {
    let token = localStorage.getItem('token');
    if (token === 'undefined' || !token) {
      token = null;
    } else {
      token = JSON.parse(token);
    }
    let user = localStorage.getItem('user');
    if (user === 'undefined' || user === null) {
      user = null;
    } else {
      user = JSON.parse(user);
    }
    if (!user || user.url === 'guest' || !token) return null;
    return user;
  };
  const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = authenticated();
    return (
      <>
        {isAuthenticated && (
          <Route {...rest} render={({ location }) => children} />
        )}
        {!isAuthenticated && <Redirect to="/login" />}
      </>
    );
  };

  return (
    <div>
    <AuthContextProvider>
    <CategoriesContextProvider>
    <Router>

    <NavBar />
    <Switch>
                                <Route exact path="/" component={LoginPage} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/signup" component={RegistrationPage} />
                                <PrivateRoute
                                  exact
                                  path="/notes"
                                  component={NotePage}
                                />
                                 <Redirect to="/" />

                                {/* <Route
                                  exact
                                  path="/error"
                                  component={PageNotFound}
                                />
                                
                                <Route path="*" component={PageNotFound} /> */}
                              </Switch>
    </Router>
    </CategoriesContextProvider>
    </AuthContextProvider>
    </div>

  );
}

export default App;
