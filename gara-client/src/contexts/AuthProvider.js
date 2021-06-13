import React, {createContext, useState} from 'react';
const axios = require('axios');

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [userAcc, setUserAcc] = useState(null);

  return (
    <AuthContext.Provider 
      value={{
        userAcc,
        setUserAcc,
        login: async (username, password) => {
          try {
            console.log('username: ' + username + ', password: ' + password);
            let loginFormData = new FormData();
            loginFormData.append('Username', username);
            loginFormData.append('Password', password);
            axios.post(process.env.REACT_APP_BASE_URL + 'api/login', loginFormData)
              .then(response => {
                return response.data;
              }).then(data => {
                console.log(data);
                setUserAcc(data);
                localStorage.setItem('UserId', data.id);
                localStorage.setItem('LoginToken', data.token);
              }).catch(error => {
                console.log(error.response.data);
              });
          } catch (error) {
            console.error(error);
          }
        },
        logout: async () => {
          try {
            await setUserAcc(null);
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