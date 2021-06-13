import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
const axios = require("axios");

function Customer() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchCustomerData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/customers", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setCustomers(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchCustomerData();
  }, []);

  return (
    <>
      <div className="content">
        {customers === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Row>
              <Col md="6">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Danh sách khách hàng</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>STT</th>
                          <th>Họ và tên</th>
                          <th>Địa chỉ</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((cus, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{cus.name}</td>
                            <td>{cus.address}</td>
                            <td>{cus.email}</td>
                            <td>{cus.phoneNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Danh sách phiếu sửa chữa</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Mô tả</th>
                          <th>Ngày yêu cầu</th>
                          <th>Biển số xe</th>
                          <th>Loại xe</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Xe quá cũ</td>
                          <td>01/01/2000</td>
                          <td>GPMN-1975</td>
                          <td>Xe xích lô</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Xe đạp hết xăng</td>
                          <td>01/01/2000</td>
                          <td>TDBP-1954</td>
                          <td>Xe tăng</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Xe tăng thủng lốp</td>
                          <td>01/01/2000</td>
                          <td>CMT8-1945</td>
                          <td>Xe đạp</td>
                        </tr>
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

export default Customer;
