import React, { useEffect, useState } from "react";

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

function Car() {
  const [cars, setCars] = useState(null);
  const [onChange, setOnchange] = useState(false);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchCarData() {
      axios
        .get("http://localhost:5000/api/cars", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setCars(data);
        })
        .catch((error) => console.log(error));
    }
    fetchCarData();
  }, [onChange]);

  return (
    <>
      <div className="content">
        {cars === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                      <CardTitle tag="h4">Danh sách xe</CardTitle>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table hover className="mb-0">
                      <thead>
                        <tr>
                          <th className="text-center" width={50}>
                            ID
                          </th>
                          <th>Biển số</th>
                          <th>Chủ xe</th>
                          <th>Hãng</th>
                          <th>Model</th>
                          <th>Khoảng cách di chuyển</th>
                          <th>Mã đăng kiểm</th>
                          <th>VIN</th>
                          <th>Màu xe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{car.numberPlate}</td>
                            <td>{car.owner}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.distanceTravelled} KM</td>
                            <td>{car.registerId}</td>
                            <td>{car.vin}</td>
                            <td>{car.color}</td>
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

export default Car;
