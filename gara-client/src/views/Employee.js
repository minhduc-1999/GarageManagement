import React, {useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
const axios = require('axios');

function Employee() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      let loginToken = localStorage.getItem('LoginToken');
      axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: 'Bearer ' + loginToken
        }
      }).then(response => {
        console.log(response.data)
        return response.data;
      }).then(data => {
        setUsers(data);
      }).catch(error => console.log(error));
    }
    fetchUserData();
  }, []);

  return (
    <>
      <div className="content">
        {users === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Danh sách nhân viên</CardTitle>
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
                        <td>{user.userClaims.firstName} {user.userClaims.lastName}</td>
                        <td>01/01/2000</td>
                        <td>TP.HCM</td>
                        <td>abc@gmail.com</td>
                        <td>{user.userClaims.phoneNumber}</td>
                        <td>{user.username}</td>
                        <td>Nhân viên tiếp nhận</td>
                        <td>02/11/2019</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        )}
      </div>
    </>
  );
}

export default Employee;
