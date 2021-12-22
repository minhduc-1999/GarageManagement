import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "contexts/AuthProvider";
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
  //searchCombo-start
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchField, setSearchField] = useState("1");

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      let newCarList = [];
      switch (searchField) {
        case "1":
          newCarList = cars.filter((car) => {
            return (car.numberPlate + "").includes(e.target.value);
          });
          break;
        case "2":
          newCarList = cars.filter((car) => {
            return (car.owner + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "3":
          newCarList = cars.filter((car) => {
            return (car.brand + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "4":
          newCarList = cars.filter((car) => {
            return (car.model + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "6":
          newCarList = cars.filter((car) => {
            return (car.registerId + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "7":
          newCarList = cars.filter((car) => {
            return (car.vin + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "8":
          newCarList = cars.filter((car) => {
            return (car.color + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;

        default:
          break;
      }
      setSearchResult(newCarList);
    } else {
      setSearchResult(cars);
    }
  };
  //searchCombo-end

  const renderCars = () =>
    (searchTerm.length < 1 ? cars : searchResult).map((car, index) => {
      return (
        <tr key={index} onClick={() => selectCarToEdit(car)}>
          <th scope="row">{index + 1}</th>
          <td>{car.numberPlate}</td>
          <td>{car.owner}</td>
          <td>{car.brand}</td>
          <td>{car.model}</td>
          <td>{car.distanceTravelled} km</td>
          <td>{car.registerId}</td>
          <td>{car.vin}</td>
          <td>{car.color}</td>
        </tr>
      );
    });

  const { userAcc } = useContext(AuthContext);
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

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
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
  }, [onChange]);

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

  const updateCar = () => {
    if (!color || !owner || !distanceTravelled) {
      setEmptyFieldCarAlert(true);
      return;
    }
    let updatedCar = {
      id: selectedCar.id,
      color: color,
      owner: owner,
      distanceTravelled: distanceTravelled,
      brand: brand,
      model: model,
      vin: VIN,
      registerId: registerId,
      numberPlate: numberPlate,
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

  const onDismiss = () => setEmptyFieldCarAlert(false);

  return (
    <div className="content">
      {userAcc.role === "storekeeper" ? (
        <p>Bạn không có quyền truy cập</p>
      ) : cars === null ? (
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
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Biển số</label>
                      <Input disabled={true} value={numberPlate} type="text" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>VIN</label>
                      <Input disabled={true} value={VIN} type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <label>Hãng xe</label>
                      <Input disabled={true} type="text" value={brand} />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <label>Model</label>
                      <Input disabled={true} value={model} type="text" />
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
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <label>Mã đăng kiểm</label>
                      <Input disabled={true} value={registerId} type="text" />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <label>Khoảng cách di chuyển (km)</label>
                      <Input
                        value={distanceTravelled}
                        type="number"
                        onChange={(e) => {
                          setDistanceTravelled(
                            e.target.value.replace(/\D/, "").replace(/^0+/, "")
                          );
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
                toggle={onDismiss}
              >
                Cập nhật không thành công.
              </Alert>
            </ModalBody>
            <ModalFooter style={{ justifyContent: "flex-end" }}>
              <Button
                onClick={updateCar}
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 25 }}
              >
                Cập nhật
              </Button>
              <Button
                onClick={closeEditCar}
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 10 }}
              >
                Đóng
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
                  <Row>
                    <Col md="2">
                      <Input
                        type="select"
                        defaultValue={"1"}
                        onChange={(e) => getSearchField(e)}
                      >
                        <option value="1">Biển số</option>
                        <option value="2">Chủ xe</option>
                        <option value="3">Hãng</option>
                        <option value="4">Model</option>
                        <option value="6">Mã đăng kiểm</option>
                        <option value="7">VIN</option>
                        <option value="8">Màu xe</option>
                      </Input>
                    </Col>
                    <Col md="3">
                      <Input
                        value={searchTerm}
                        type="text"
                        placeholder="Tìm kiếm xe"
                        onChange={(e) => getSearchTerm(e)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {renderCars().length <= 0 ? (
                    <p style={{ fontSize: 20, marginLeft: 10 }}>
                      Không tìm thấy xe phù hợp
                    </p>
                  ) : (
                    <table className="table table-borderless table-hover">
                      <thead>
                        <tr>
                          <th width={50}>STT</th>
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
                      <tbody>{renderCars()}</tbody>
                    </table>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Car;
