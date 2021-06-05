import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

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
    axios.get('http://localhost:5000/api/users', {
      params: {
        id: userId
      },
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(response => {
      setUserAcc(response.data);
      setInitializing(false);
    }).catch(error => {
      console.log(error.response.data);
    })
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
              <Route path="/rtl" render={(props) => <RTLLayout {...props} />} />
              <Redirect from="/" to="/admin/dashboard" />
            </Switch>
          </BrowserRouter>
        }
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
};

export default App;