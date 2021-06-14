import React, { useEffect, useState } from "react";
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
  Input,
  FormGroup,
  Form,
  Alert,
  Label,
} from "reactstrap";

import { Tooltip, Fab, Checkbox } from "@material-ui/core";
import "../components/CustomDesign/SuggestList.css";
const axios = require("axios");

function RepairedRequestList() {
  const [laborCosts, setLaborCost] = useState(null);
  const [SelectedLabor, setSelectedLabor] = useState(null);
  const [laborName, setLaborName] = useState(null);
  const [laborValue, setLaborValue] = useState("");
  const [onChange, setOnchange] = useState(false);

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [email, setEmail] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [listName, setListName] = useState(null);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  const [brand, setBrand] = useState(null);
  const [numberPlate, setNumberPlate] = useState(null);
  const [VIN, setVIN] = useState(null);
  const [distanceTravelled, setDistanceTravelled] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [owner, setOwner] = useState(null);
  const [color, setColor] = useState(null);
  const [model, setModel] = useState(null);
  const [emptyFieldCarAlert, setEmptyFieldCarAlert] = useState(false);

  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [listAccessoryDB, setListAccessoryDB] = useState(null);
  const [accessorySearch, setAccessorySearch] = useState("");
  const [accessoryList, setAccessoryList] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const AddNewCar = () => {
    if (
      !brand ||
      !numberPlate ||
      !VIN ||
      !distanceTravelled ||
      !registerId ||
      !owner ||
      !color ||
      !model
    ) {
      setEmptyFieldCarAlert(true);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    console.log("TOKEN " + loginToken);
    let createCar = new FormData();
    createCar.append("Brand", brand);
    createCar.append("NumberPlate", numberPlate);
    createCar.append("VIN", VIN);
    createCar.append("DistanceTravelled", distanceTravelled);
    createCar.append("RegisterId", registerId);
    createCar.append("Owner", owner);
    createCar.append("Color", color);
    createCar.append("Model", model);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/cars", createCar, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        console.log("Add new car oke");
        clearCarInputModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDismissCarEmpty = () => setEmptyFieldAlert(!emptyFieldCarAlert);

  const AddNewCustomer = () => {
    if (!name || !address || !phoneNum || !email) {
      setEmptyFieldAlert(true);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let createCustomer = new FormData();
    createCustomer.append("Name", name);
    createCustomer.append("Address", address);
    createCustomer.append("PhoneNumber", phoneNum);
    createCustomer.append("Email", email);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/customers", createCustomer, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        console.log("thanh cong");
        setOpenNewCustomer(!openNewCustomer);
        setOnchange(!onChange);
      })
      .catch((error) => {
        console.log(error);
        setAlertVisible(true);
      });
  };

  const onDismiss = () => setAlertVisible(!alertVisible);
  const onDismissEmpty = () => setEmptyFieldAlert(!emptyFieldAlert);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchLaborCostData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/laborcosts", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setLaborCost(data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchCustomerData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/customers", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setListName(data.map((dat) => dat.name));
        })
        .catch((error) => console.log(error));
    }
    async function fetchAccessoriesData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/accessories", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setListAccessoryDB(data);
        })
        .catch((error) => console.log(error));
    }
    fetchCustomerData();
    fetchAccessoriesData();
    fetchLaborCostData();
  }, [onChange]);

  const [openNewCustomer, setOpenNewCustomer] = React.useState(false);

  const handleClickOpenNewCustomer = () => {
    setOpenNewCustomer(true);
  };

  const handleCloseNewCustomer = () => {
    setOpenNewCustomer(false);
    setAlertVisible(false);
    setEmptyFieldAlert(false);
  };

  const [openNewCar, setOpenNewCar] = React.useState(false);

  const handleClickOpenNewCar = () => {
    clearCarInputModal();
    setOpenNewCar(true);
  };

  const handleCloseNewCar = () => {
    setOpenNewCar(false);
    setEmptyFieldCarAlert(false);
    clearCarInputModal();
  };

  const [openInvoice, setOpenInvoice] = React.useState(false);

  const handleClickOpenInvoice = () => {
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };

  const [open, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const [openCreateQuotation, setOpenCQModal] = React.useState(false);

  const handleClickOpenCQ = () => {
    setOpenCQModal(true);
  };

  const handleClickCloseCQ = () => {
    clearQDFields();
    setTempQuotationTotal(0);
    setQDList([]);
    setHiddenLaborCost(false);
    setSelectedLabor(null);
    setOpenCQModal(false);
  };

  const [hiddenLaborCost, setHiddenLaborCost] = React.useState(false);

  // const createNewLaborCost = () => {
  //   if (!laborName || !laborValue) {
  //     console.log("Thiếu thông tin tạo phí sửa chữa mới");
  //     return;
  //   }
  //   let loginToken = localStorage.getItem("LoginToken");
  //   let createLaborCost = new FormData();
  //   createLaborCost.append("name", laborName);
  //   createLaborCost.append("value", laborValue);
  //   axios
  //     .post(
  //       process.env.REACT_APP_BASE_URL + "api/laborcosts",
  //       createLaborCost,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + loginToken,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       setOnchange(!onChange);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const addQDToTable = () => {
    if (quantity !== 0 && selectedAccessory !== null) {
      if (hiddenLaborCost && laborName !== "" && laborValue !== "") {
        if (true) {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice: selectedAccessory.issuePrice,
              laborCost: laborValue,
              issueName: laborName,
            },
          ]);
          setTempQuotationTotal(
            tempQuotationTotal +
              quantity * Number(selectedAccessory.issuePrice) +
              Number(laborValue)
          );
        }
        clearQDFields();
      } else {
        if (SelectedLabor === null) {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice: selectedAccessory.issuePrice,
            },
          ]);
          setTempQuotationTotal(
            tempQuotationTotal + quantity * Number(selectedAccessory.issuePrice)
          );
        } else if (SelectedLabor.name !== "Không") {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice: selectedAccessory.issuePrice,
              laborCost: SelectedLabor.value,
              issueName: SelectedLabor.name,
            },
          ]);
          setTempQuotationTotal(
            tempQuotationTotal +
              quantity * Number(selectedAccessory.issuePrice) +
              Number(SelectedLabor.value)
          );
        } else {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice: selectedAccessory.issuePrice,
            },
          ]);
          setTempQuotationTotal(
            tempQuotationTotal + quantity * Number(selectedAccessory.issuePrice)
          );
        }
        clearQDFields();
      }
    }
  };

  const clearQDFields = () => {
    setAccessorySearch("");
    setSelectedAccessory(null);
    setQuantity(0);
    setSelectedLabor(null);
    setLaborName("");
    setLaborValue("");
  };

  const onAccessoriesChangeHandler = (e) => {
    const value = e.target.value;
    if (value != null && listAccessoryDB != null) {
      setAccessorySearch(value);
      setSelectedAccessory(null);
      let temp = [];
      if (value) {
        temp = listAccessoryDB.filter((ac) =>
          ac.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      setAccessoryList(temp);
    }
  };

  const renderAccessoriesSuggestions = () => {
    if (accessoryList.length === 0) {
      return null;
    }
    return (
      <div className="sugAccessoriesList">
        {accessoryList.slice(0, 5).map((l, index) => (
          <p
            key={index}
            className="sugAccessoriesItem"
            onClick={() => {
              console.log(l);
              setSelectedAccessory(l);
              setAccessorySearch(l.name);
              setAccessoryList([]);
            }}
          >
            {l.name}
          </p>
        ))}
      </div>
    );
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
    let temp = [];
    if (value) {
      temp = listName.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setList(temp);
  };

  const renderSuggestions = () => {
    if (list.length === 0) {
      return null;
    }
    return (
      <div className="sugList">
        {list.slice(0, 5).map((l, index) => (
          <p
            key={index}
            className="sugItem"
            onClick={() => {
              console.log(l);
              setSearch(l);
              setList([]);
            }}
          >
            {l}
          </p>
        ))}
      </div>
    );
  };

  const [CarByNumberPlate, setCarByNumberPlate] = useState(null);
  const [CarNotExist, setCarNotExist] = useState(false);
  const onDismissCarNotExist = () => setCarNotExist(false);

  const getCarByNumberPlate = () => {
    if (!numberPlate) {
      console.log("Chưa nhập biển số");
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    console.log("[Bien so] " + numberPlate);
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "api/cars/search?type=numberplate&value=" +
          numberPlate.trim(),
        {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        }
      )
      .then((response) => {
        setCarByNumberPlate(response.data);
        console.log(CarByNumberPlate);
        setBrand(CarByNumberPlate.brand);
        setModel(CarByNumberPlate.model);
        setColor(CarByNumberPlate.color);
        setOwner(CarByNumberPlate.owner);
        setRegisterId(CarByNumberPlate.registerId);
        setDistanceTravelled(CarByNumberPlate.distanceTravelled);
        setVIN(CarByNumberPlate.vin);
      })
      .catch((error) => {
        console.log(error);
        console.log("Xe khong ton tai");
        setCarNotExist(true);
      });
  };

  const clearCarInputModal = () => {
    setBrand(null);
    setModel(null);
    setNumberPlate(null);
    setColor(null);
    setOwner(null);
    setRegisterId(null);
    setDistanceTravelled(null);
    setVIN(null);
  };

  const [QDList, setQDList] = useState([]);
  const [tempQuotationTotal, setTempQuotationTotal] = useState(0);

  return (
    <>
      <div className="content">
        {laborCosts === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Modal isOpen={openCreateQuotation} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phiếu báo giá dịch vụ
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>Tên phụ tùng</label>
                        <Input
                          name="select"
                          id="exampleSelect"
                          type="search"
                          value={accessorySearch}
                          onChange={(e) => onAccessoriesChangeHandler(e)}
                        ></Input>
                        {renderAccessoriesSuggestions()}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Đơn giá</label>
                        <h4>
                          {selectedAccessory != null
                            ? selectedAccessory.issuePrice
                            : 0}{" "}
                          VNĐ
                        </h4>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Số lượng</label>
                        <Input
                          type="text"
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(
                              e.target.value
                                .replace(/\D/, "")
                                .replace(/^0+/, "")
                            );
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col hidden={hiddenLaborCost}>
                      <Row>
                        <Col md="4">
                          <label>Chọn dịch vụ</label>
                        </Col>
                        <Col md="4">
                          <label>Tiền phí</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col hidden={!hiddenLaborCost}>
                      <Row>
                        <Col md="4">
                          <label>Tên dịch vụ</label>
                        </Col>
                        <Col md="4">
                          <label>Tiền phí (VNĐ)</label>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col hidden={hiddenLaborCost}>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <Input
                              name="select"
                              id="exampleSelect"
                              type="select"
                              defaultValue={"0"}
                              onChange={(e) =>
                                setSelectedLabor({
                                  name: e.target.options[e.target.selectedIndex]
                                    .text,
                                  value: e.target.value,
                                })
                              }
                            >
                              <option value={"0"}>Không</option>
                              {laborCosts.map((laborCost) => (
                                <option value={laborCost.value}>
                                  {laborCost.name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <h4>
                            {SelectedLabor != null ? SelectedLabor.value : "0"}{" "}
                            VNĐ
                          </h4>
                        </Col>
                      </Row>
                    </Col>
                    <Col hidden={!hiddenLaborCost}>
                      <Row>
                        <Col className="pr-md-1">
                          <FormGroup style={{ marginRight: 5 }}>
                            <Input
                              type="text"
                              value={laborName}
                              onChange={(e) => setLaborName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" style={{ marginLeft: 10 }}>
                          <FormGroup style={{ marginLeft: 5 }}>
                            <Input
                              type="text"
                              value={laborValue}
                              onChange={(e) =>
                                setLaborValue(
                                  e.target.value
                                    .replace(/\D/, "")
                                    .replace(/^0+/, "")
                                )
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <Checkbox
                          color="primary"
                          onChange={(e) => setHiddenLaborCost(e.target.checked)}
                        ></Checkbox>
                        <label>Loại phí mới</label>
                      </FormGroup>
                    </Col>
                    <Col
                      md="1"
                      style={{ alignItems: "flex-end", display: "flex" }}
                    >
                      <Tooltip title="Thêm">
                        <Fab
                          size="small"
                          style={{ marginBottom: 10 }}
                          onClick={addQDToTable}
                        >
                          <i className="tim-icons icon-simple-add"></i>
                        </Fab>
                      </Tooltip>
                    </Col>
                  </Row>
                  <ColoredLine color="grey" />
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Phụ tùng</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Loại lỗi</th>
                        <th>Phí sửa chữa</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {QDList.map((QD, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{QD.accessoryName}</td>
                          <td>{QD.quantity}</td>
                          <td>{QD.unitPrice} VNĐ</td>
                          <td>
                            {QD.issueName != null ? QD.issueName : "Không có"}
                          </td>
                          <td>{QD.laborCost != null ? QD.laborCost : 0} VNĐ</td>
                          <td>
                            {QD.laborCost != null
                              ? Number(QD.quantity) * Number(QD.unitPrice) +
                                Number(QD.laborCost)
                              : Number(QD.quantity) * Number(QD.unitPrice)}
                            VNĐ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <ColoredLine color="grey" />
                  <Row>
                    <Col>
                      <FormGroup>
                        <legend>Tổng cộng</legend>
                      </FormGroup>
                    </Col>
                    <Row>
                      <Col md="auto" style={{ marginRight: 25 }}>
                        <legend className="title">
                          {tempQuotationTotal} VNĐ
                        </legend>
                      </Col>
                    </Row>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleClickCloseCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleClickCloseCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  In phiếu
                </Button>
                <Button
                  onClick={handleClickCloseCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Lưu
                </Button>
                <Button
                  onClick={handleClickCloseCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openInvoice} size="lg">
              <ModalHeader style={{ margin: 25, justifyContent: "center" }}>
                <h3 className="title">Hóa đơn</h3>
              </ModalHeader>
              <ModalBody>
                <ColoredLine color="gray" />
                <Row>
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col>
                          <CardTitle tag="h4">Danh sách phụ tùng</CardTitle>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>ID</th>
                            <th>Phụ tùng</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>abc</td>
                            <td>50</td>
                            <td>10000 VNĐ</td>
                            <td>5000000 VNĐ</td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>xyz</td>
                            <td>50</td>
                            <td>10000 VNĐ</td>
                            <td>5000000 VNĐ</td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>binh</td>
                            <td>50</td>
                            <td>10000 VNĐ</td>
                            <td>5000000 VNĐ</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Row>
                <Row>
                  <Col>
                    <h4 className="title">Phí sửa chữa</h4>
                  </Col>
                  <Col md="auto">
                    <h5 className="title">100000 VNĐ</h5>
                  </Col>
                </Row>
                <ColoredLine color="gray" />
                <Row>
                  <Col>
                    <h4 className="title">Thành tiền</h4>
                  </Col>
                  <Col md="auto">
                    <h4 className="title">1000000 VNĐ</h4>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleCloseInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  In hóa đơn
                </Button>
                <Button
                  onClick={handleCloseInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  OK
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={open} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phiếu tiếp nhận xe
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col>
                      <label>Khách hàng</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          name="select"
                          id="exampleSelect"
                          type="search"
                          value={search}
                          onChange={(e) => onChangeHandler(e)}
                        ></Input>
                        {renderSuggestions()}
                      </FormGroup>
                    </Col>
                    <Col md="auto">
                      <Tooltip title="Thêm khách hàng mới">
                        <Fab
                          onClick={handleClickOpenNewCustomer}
                          size="small"
                          style={{ marginBottom: 10 }}
                        >
                          <i className="tim-icons icon-simple-add"></i>
                        </Fab>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label style={{ marginTop: 10 }}>Thêm xe mới</Label>
                    </Col>
                    <Col sm="auto">
                      <Tooltip title="Thêm xe mới">
                        <Fab
                          onClick={handleClickOpenNewCar}
                          size="small"
                          style={{ marginBottom: 10 }}
                        >
                          <i className="tim-icons icon-simple-add"></i>
                        </Fab>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Nội dung sửa chữa</label>
                        <Input cols="80" rows="4" type="textarea" />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleClose}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 20 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleClickOpenCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 20 }}
                >
                  Báo giá
                </Button>
                <Button
                  onClick={handleClickOpenInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit" /*style={{marginRight:20}}*/
                >
                  Thanh toán
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openNewCustomer} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin khách hàng mới
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 10, marginRight: 10 }}>
                  <FormGroup>
                    <label>Họ và Tên</label>
                    <Input
                      placeholder="Họ và tên"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Địa chỉ Email</label>
                    <Input
                      placeholder="Email"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Số điện thoại</label>
                    <Input
                      placeholder="Số điện thoại"
                      type="text"
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Địa chỉ</label>
                    <Input
                      placeholder="Địa chỉ"
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                </Form>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertVisible}
                  toggle={onDismiss}
                >
                  Tên tài khoản đã được sử dụng.
                </Alert>
                <Alert
                  style={{ width: 330 }}
                  className="alert-error"
                  color="warning"
                  isOpen={emptyFieldAlert}
                  toggle={onDismissEmpty}
                >
                  Thiếu thông tin khách hàng.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={AddNewCustomer}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseNewCustomer}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openNewCar} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin xe mới
                </p>
              </ModalHeader>
              <ModalBody>
                <Form
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <Row>
                    <Col>
                      <label>Biển số</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        {/* <label>Biển số</label> */}
                        <Input
                          type="text"
                          onChange={(e) => {
                            onDismissCarNotExist(true);
                            setNumberPlate(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="auto" style={{ marginTop: -5 }}>
                      <Button
                        onClick={() => {
                          console.log("Check xe ton tai trong db");
                          getCarByNumberPlate();
                        }}
                        color="primary"
                      >
                        Kiểm tra
                      </Button>
                    </Col>
                  </Row>
                  <Alert
                    style={{ width: 730 }}
                    className="alert-error"
                    color="warning"
                    isOpen={CarNotExist}
                    toggle={onDismissCarNotExist}
                  >
                    Xe không có trong dữ liệu
                  </Alert>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Hãng xe</label>
                        <Input
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
                            setDistanceTravelled(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label>VIN</label>
                    <Input
                      value={VIN}
                      type="text"
                      onChange={(e) => {
                        setVIN(e.target.value);
                        setEmptyFieldCarAlert(false);
                      }}
                    />
                  </FormGroup>
                </Form>
                <Alert
                  style={{ width: 730, marginLeft: 10 }}
                  className="alert-error"
                  color="warning"
                  isOpen={emptyFieldCarAlert}
                  toggle={onDismissCarEmpty}
                >
                  Thiếu thông tin xe.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={AddNewCar}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseNewCar}
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
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle tag="h4">
                        Danh sách phiếu tiếp nhận xe
                      </CardTitle>
                    </Col>
                    <Col md="auto">
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        onClick={handleClickOpen}
                      >
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
                        <th>Ngày tiếp nhận</th>
                        <th>Chủ xe</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Hiệu xe</th>
                        <th>Biển số</th>
                        <th>Tình trạng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>22/04/2021</td>
                        <td>Nguyen Van A</td>
                        <td>TP.HCM</td>
                        <td>0123456789</td>
                        <td>BMW-350i</td>
                        <td>92A-12345</td>
                        <td>
                          <font color="red">Chưa thanh toán</font>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>22/04/2021</td>
                        <td>Nguyen Van B</td>
                        <td>TP.HCM</td>
                        <td>0123456789</td>
                        <td>Mazda 3</td>
                        <td>92A-54321</td>
                        <td>
                          <font color="green">Đã thanh toán</font>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>22/04/2021</td>
                        <td>Nguyen Van C</td>
                        <td>TP.HCM</td>
                        <td>0123456789</td>
                        <td>Lexus 570</td>
                        <td>92A-12346</td>
                        <td>
                          <font color="green">Đã thanh toán</font>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default RepairedRequestList;
