import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import "./Login.css";
import { AuthContext } from "../../contexts/AuthProvider";

export function ValidateUsername(username) {
  if (!username) return false
  const regex = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g
  return regex.test(username)
}

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ValidateUsername(username)) {
      setAlertMessage('Tên tài khoản không hợp lệ')
      setAlertVisible(true)
      return
    }
    login(username, password).then((res) => {
      if (!res) {
        setAlertVisible(true);
        setAlertMessage('Tên tài khoản hoặc mật khẩu không đúng.')
      }
    });
  };

  const onDismiss = () => setAlertVisible(false);

  return (
    <div className="login-container">
      <Form id="login-form" onSubmit={handleSubmit}>
        <FormGroup row>
          <Label className="formLabel" for="exampleEmail">
            Tài khoản
          </Label>
          <Input
            className="form-input"
            type="text"
            name="user"
            id="user"
            autoComplete="off"
            placeholder="Tên tài khoản"
            onChange={(e) => {
              setUsername(e.target.value);
              setAlertVisible(false)
            }}
          />
        </FormGroup>
        <FormGroup row>
          <Label className="formLabel" for="examplePassword">
            Mật khẩu
          </Label>
          <Input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value);
              setAlertVisible(false);
            }}
          />
        </FormGroup>
        <Button id="login-button">Đăng nhập</Button>
      </Form>
      <Alert
        className="alert-error"
        color="warning"
        isOpen={alertVisible}
        toggle={onDismiss}
      > {alertMessage}

      </Alert>
    </div>
  );
}

export default Login;
