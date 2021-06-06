import React, {useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
const axios = require('axios');
const dateFormat = require("dateformat");

function Employee() {
  const [users, setUsers] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [onAddNewUser, setOnAddNewUser] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [dateOB, setDateOB] = useState(null);
  const [address, setAddress] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false)
  const [onChange, setOnchange] = useState(false);

  const translateRoles = {
    admin: 'admin',
    manager: 'quản lý',
    storekeeper: 'thủ kho',
    receptionist: 'nhân viên tiếp nhận',
    employee: 'nhân viên'
  }

  useEffect(() => {
    let loginToken = localStorage.getItem('LoginToken');
    async function fetchUserData() {
      axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: 'Bearer ' + loginToken
        }
      }).then(response => {
        return response.data;
      }).then(data => {
        setUsers(data);
      }).catch(error => console.log(error));
    }
    async function fetchUserRoles() {
      axios.get('http://localhost:5000/api/users/roles', {
        headers: {
          Authorization: 'Bearer ' + loginToken
        }
      }).then(response => {
        return response.data;
      }).then(data => {
        setUserRoles(data);
      }).catch(error => console.log(error));
    }
    fetchUserData();
    fetchUserRoles();
  }, [onChange]);

  const addNewUser = () => {
    if (!roleId || !username || !password) {
      console.log('Thiếu thông tin tạo tài khoản');
      return;
    }
    let loginToken = localStorage.getItem('LoginToken');
    let createUser = new FormData();
    createUser.append('username', username);
    createUser.append('password', password);
    createUser.append('role', roleId);
    createUser.append('firstName', firstName);
    createUser.append('lastName', lastName);
    createUser.append('email', email);
    createUser.append('phoneNumber', phoneNum);
    createUser.append('dateOB', dateOB);
    createUser.append('address', address);
    axios.post('http://localhost:5000/api/users', createUser, {
      headers: {
        Authorization: 'Bearer ' + loginToken
      }
    }).then(response => {
      console.log(response);
      setOnchange(!onChange);
      setOnAddNewUser(!onAddNewUser)
    }).catch(error => {
      console.log(error);
      setAlertVisible(!alertVisible);
    })
  }

  const handleOpenDialog = () => setOnAddNewUser(!onAddNewUser);
  const onDismiss = () => setAlertVisible(!alertVisible);

  return (
    <>
      <div className="content">
        {(users === null || userRoles === null) ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
        <div>
          <Modal scrollable={false} isOpen={onAddNewUser}>
            <ModalHeader style={{justifyContent:"center"}}>
              <p className="title">Thêm nhân viên mới</p>
            </ModalHeader>
            <ModalBody>
              <Form style={{marginLeft: 30, marginRight: 30}}>
                <FormGroup row>
                  <Label for="exampleEmail">Tài khoản</Label>
                  <Input type="text" name="user" id="user" placeholder="Tài khoản"
                    onChange={e => setUsername(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword">Mật khẩu</Label>
                  <Input type="password" name="password" id="password" placeholder="Mật khẩu"
                    onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label>Chức vụ</Label>
                  <Input defaultValue={'DEFAULT'} type="select" name="select" id="exampleSelect" 
                    onChange={e => setRoleId(e.target.value)} >
                        <option value='DEFAULT' disabled>Chọn chức vụ</option>
                    {userRoles.map(item => (
                        <option key={item.id} value={item.id}>{item.roleName}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Họ</Label>
                  <Input type="text" name="user" id="lastName" placeholder="Họ"
                    onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Tên</Label>
                  <Input type="text" name="user" id="firstName" placeholder="Tên"
                    onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Email</Label>
                  <Input type="text" name="user" id="email" placeholder="Email"
                    onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Số điện thoại</Label>
                  <Input type="text" name="user" id="phoneNum" placeholder="Số điện thoại"
                    onChange={e => setPhoneNum(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Ngày sinh</Label>
                  <Input type="date" name="user" id="dateOB" placeholder="Ngày sinh"
                    onChange={e => setDateOB(e.target.value)} />
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail">Địa chỉ</Label>
                  <Input type="text" name="user" id="address" placeholder="Địa chỉ"
                    onChange={e => setAddress(e.target.value)} />
                </FormGroup>
                <Alert className="alert-error" color="warning" isOpen={alertVisible} toggle={onDismiss}>
                  Tên tài khoản đã được sử dụng.
                </Alert>
              </Form>
            </ModalBody>
            <ModalFooter style={{margin: 25, justifyContent:"flex-end"}}>
              <Button 
                className="btn-fill"
                color="primary" 
                type="submit" 
                style={{marginRight: 25}}
                onClick={addNewUser} >
                Thêm
              </Button>
              <Button className="btn-fill" color="secondary" type="submit" onClick={handleOpenDialog}>
                Hủy
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle tag="h4">Danh sách nhân viên</CardTitle>
                    </Col>
                    <Col md="auto">
                      <Button className="btn-fill" color="primary" type="submit" onClick={handleOpenDialog}>
                        Thêm
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" hover>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Ngày sinh</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Tên đăng nhập</th>
                        <th>Chức vụ</th>
                        <th>Ngày tham gia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index} >
                          <th scope="row">{index + 1}</th>
                          <td>{user.userClaims.lastName} {user.userClaims.firstName} </td>
                          <td>{(user.userClaims.dateOB ? dateFormat(user.userClaims.dateOB, 'dd/mm/yyyy') : '-')}</td>
                          <td>{(user.userClaims.address ? user.userClaims.address : '-')}</td>
                          <td>{(user.userClaims.email ? user.userClaims.email : '-')}</td>
                          <td>{(user.userClaims.phoneNumber ? user.userClaims.phoneNumber : '-')}</td>
                          <td>{user.username}</td>
                          <td>{translateRoles.['employee']}</td>
                          <td>02/11/2019</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        )}
      </div>
    </>
  );
}

export default Employee;
