import { number } from "prop-types";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Form,
  Alert,
} from "reactstrap";

const axios = require("axios");

function Car() {
  const [cars, setCars] = useState(null);
  const [onChange, setOnchange] = useState(false);

  const [openEditCar, setOpenEditCar] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);

  const [brand, setBrand] = useState(null);
  const [numberPlate, setNumberPlate] = useState(null);
  const [VIN, setVIN] = useState(null);
  const [distanceTravelled, setDistanceTravelled] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [owner, setOwner] = useState(null);
  const [color, setColor] = useState(null);
  const [model, setModel] = useState(null);
  const [emptyFieldCarAlert, setEmptyFieldCarAlert] = useState(false);

  const closeEditCar = () => {
    setSelectedCar(null);
    setOpenEditCar(false);
  };

  const selectCarToEdit = (car) => {
    setSelectedCar(car);

    setBrand(car.brand);
    setNumberPlate(car.numberPlate);
    setVIN(car.vin);
    setDistanceTravelled(car.distanceTravelled);
    setRegisterId(car.registerId);
    setOwner(car.owner);
    setColor(car.color);
    setModel(car.model);

    setOpenEditCar(true);
  };

  const compareCar = (car) => {
    if (
      car.color !== color ||
      car.owner !== owner ||
      car.distanceTravelled !== distanceTravelled
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateCar = () => {
    let updatedCar = {
      id: selectedCar.id,
      color: color,
      owner: owner,
      distanceTravelled: distanceTravelled,
      brand: selectedCar.brand,
      model: selectedCar.model,
      vin: selectedCar.vin,
      registerId: selectedCar.registerId,
      numberPlate: selectedCar.numberPlate,
    };
    let loginToken = localStorage.getItem("LoginToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    };
    axios
      .put(process.env.REACT_APP_BASE_URL + "api/cars", updatedCar, {
        headers: headers,
      })
      .then((response) => {
        setOnchange(!onChange);
        closeEditCar();
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchCarData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/cars", {
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
            <Modal isOpen={openEditCar} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin xe
                </p>
              </ModalHeader>
              <ModalBody>
                <Form
                // style={{
                //   marginLeft: 10,
                //   marginRight: 10,
                // }}
                >
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Biển số</label>
                        <Input
                          disabled="true"
                          value={numberPlate}
                          type="text"
                          onChange={(e) => {
                            setNumberPlate(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <label>VIN</label>
                        <Input
                          disabled="true"
                          value={VIN}
                          type="text"
                          onChange={(e) => {
                            setVIN(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Hãng xe</label>
                        <Input
                          disabled="true"
                          type="text"
                          value={brand}
                          onChange={(e) => {
                            setBrand(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Model</label>
                        <Input
                          disabled="true"
                          value={model}
                          type="text"
                          onChange={(e) => {
                            setModel(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Màu sắc</label>
                        <Input
                          value={color}
                          type="text"
                          onChange={(e) => {
                            setColor(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Chủ xe</label>
                        <Input
                          value={owner}
                          type="text"
                          onChange={(e) => {
                            setOwner(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Mã đăng kiểm</label>
                        <Input
                          disabled="true"
                          value={registerId}
                          type="text"
                          onChange={(e) => {
                            setRegisterId(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Khoảng cách di chuyển (KM)</label>
                        <Input
                          value={distanceTravelled}
                          type="text"
                          onChange={(e) => {
                            setDistanceTravelled(
                              e.target.value
                                .replace(/\D/, "")
                                .replace(/^0+/, "")
                            );
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <Alert
                  style={{ width: 730, marginLeft: 10 }}
                  className="alert-error"
                  color="warning"
                  isOpen={emptyFieldCarAlert}
                >
                  Thiếu thông tin xe.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ justifyContent: "flex-end" }}>
                {selectedCar !== null && compareCar(selectedCar) === true ? (
                  <Button
                    onClick={updateCar}
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    style={{ marginRight: 25 }}
                  >
                    Cập nhật
                  </Button>
                ) : (
                  <div hidden="true"></div>
                )}
                <Button
                  onClick={closeEditCar}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 10 }}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                      <CardTitle tag="h4">Danh sách xe</CardTitle>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <table class="table">
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
                          <tr
                            key={index}
                            onDoubleClick={() => selectCarToEdit(car)}
                          >
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
                    </table>
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
