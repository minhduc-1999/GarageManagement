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
            axios.post('http://localhost:5000/api/login', loginFormData)
              .then(response => {
                console.log(response);
                return response.data;
              }).then(data => {
                setUserAcc(data);
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