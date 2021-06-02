import React, {useContext, useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css';
import {AuthContext} from '../../contexts/AuthProvider';

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    
    login(username, password);
  }

  return(
    <div className='login-container'>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">User</Label>
          <Input type="text" name="user" id="user" placeholder="User name"
            onChange={e => setUsername(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Password"
            onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default Login;