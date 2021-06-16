import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
} from "reactstrap";
const axios = require("axios");
const dateFormat = require("dateformat");

function Customer() {
  const [customers, setCustomers] = useState([]);

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
        {customers.length < 1 ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Row>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Danh sách khách hàng</CardTitle>
                </CardHeader>
                <CardBody>
                  <table class="table">
                    <thead className="text-primary">
                      <tr>
                        <th>STT</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Ngày đăng ký</th>
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
                          <td>{dateFormat(cus.createdDate, "dd/mm/yyyy")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default Customer;
