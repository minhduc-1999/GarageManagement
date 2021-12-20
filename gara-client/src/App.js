import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

import Login from './components/Login/Login';
import {AuthContext} from './contexts/AuthProvider';

const axios = require('axios');

const App = props => {
  const {userAcc, setUserAcc} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  
  useEffect(() => {
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('LoginToken');
    if (!token || !userId) {
      setInitializing(false);
      return;
    }
    axios.get(process.env.REACT_APP_BASE_URL + 'api/users/' + userId, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      setUserAcc(response.data);
    }).catch(error => {
      console.log(error.response.data);
    })
    setInitializing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        {initializing ? 
          <p>Loading...</p> :
        !userAcc ? 
          <Login /> :
          <BrowserRouter>
            <Switch>
              <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
              <Redirect from="/" to="/admin/user-profile" />
            </Switch>
          </BrowserRouter>
        }
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
};

export default App;