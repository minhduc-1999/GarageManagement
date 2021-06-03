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
            var loginFormData = new FormData();
            loginFormData.append('Username', username);
            loginFormData.append('Password', password);
            var res = await axios.post('http://localhost:5000/api/login', loginFormData)
                .then(response => {
                return response.data;
              }).catch(error => {
                console.log(error.response.data);
              });
            setUserAcc(res);
          } catch (error) {
            console.error(error);
          }
        },
        logout: async () => {
          try {
            await setUserAcc(null);
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