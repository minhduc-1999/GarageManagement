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
} from "reactstrap";
const axios = require('axios');
const dateFormat = require("dateformat");

function Employee() {
  const [users, setUsers] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [onAddNewUser, setOnAddNewUser] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState('admin');
  const [roleId, setRoleId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [dateOB, setDateOB] = useState(null);
  const [onChange, setOnchange] = useState(false)

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

  function setRoleIdByName(roleName) {
    userRoles.forEach(element => {
      if(element.roleName === role) {
        setRoleId(element.id);
        console.log(roleId);
      }
    });
  }

  const addNewUser = () => {
    setRoleIdByName(userRoles, role);
    if (!roleId || !username || !password || !firstName || !lastName || !(dateOB instanceof Date)) {
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
    })
  }

  const handleOpenDialog = () => setOnAddNewUser(!onAddNewUser);

  return (
    <>
      <div className="content">
        {users === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
        <div>
          <Modal scrollable={false} isOpen={onAddNewUser}>
            <ModalHeader style={{justifyContent:"center"}}>
              <h3 className="title">Thêm nhân viên mới</h3>
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
                  <Input type="select" name="select" id="exampleSelect" 
                    onChange={e => setRole(e.target.value)} >
                    <option value={'admin'}>Admin</option>
                    <option value={'manager'}>Quản lý</option>
                    <option value={'storekeeper'}>Thủ kho</option>
                    <option value={'receptionist'}>Nhân viên tiếp nhận</option>
                    <option value={'employee'}>Nhân viên sửa chữa</option>
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
                  <Input type="text" name="user" id="dateOB" placeholder="Ngày sinh"
                    onChange={e => setDateOB(e.target.value)} />
                </FormGroup>
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
                  <Table className="tablesorter" responsive>
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
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.userClaims.lastName} {user.userClaims.firstName} </td>
                          <td>{(user.userClaims.dateOB ? dateFormat(user.userClaims.dateOB, 'dd/mm/yyyy') : '-')}</td>
                          <td>{user.userClaims.address}</td>
                          <td>{user.userClaims.email}</td>
                          <td>{user.userClaims.phoneNumber}</td>
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
