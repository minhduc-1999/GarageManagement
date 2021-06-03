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
          <Label for="exampleEmail">Tài khoản</Label>
          <Input type="text" name="user" id="user" placeholder="Tên tài khoản"
            onChange={e => setUsername(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Mật khẩu</Label>
          <Input type="password" name="password" id="password" placeholder="Mật khẩu"
            onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button className='login-button'>Đăng nhập</Button>
      </Form>
    </div>
  );
};

export default Login;