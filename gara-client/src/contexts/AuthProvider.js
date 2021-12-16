import React, { createContext, useState } from 'react';
const axios = require('axios');

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAcc, setUserAcc] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userAcc,
        setUserAcc,
        login: (username, password) => {
          try {
            console.log('here')
            let loginFormData = new FormData();
            loginFormData.append('Username', username);
            loginFormData.append('Password', password);
            return axios.post(process.env.REACT_APP_BASE_URL + 'api/login', loginFormData)
              .then(response => {
                setUserAcc(response.data);
                localStorage.setItem('UserId', response.data.id);
                localStorage.setItem('LoginToken', response.data.token);
                return true;
              }).catch(error => {
                console.log(error);
                return false;
              });
          } catch (error) {
            console.error(error);
            return false;
          }
        },
        logout: () => {
          try {
            setUserAcc(null);
            localStorage.removeItem('UserId');
            localStorage.removeItem('LoginToken');
          } catch (error) {
            console.log(error);
          }
        }
      }} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;