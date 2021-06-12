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
} from "reactstrap";
import { Tooltip, Fab, TextField } from "@material-ui/core";
const axios = require("axios");

function Accessories() {
  const [onChange, setOnchange] = useState(false);
  const [accessories, setAccessories] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [receipPrice, setReceipPrice] = useState(null);
  const [expiredDate, setExpiredDate] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [accessoryTypeId, setAccessoryTypeId] = useState(null);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  // const [provider, setProvider] = useState(null);
  // const [accessoryType, setAccessoryType] = useState(null);
  // const [typeName, setAccessoryTypeName] = useState(null);
  const [providerName, setProviderName] = useState(null);
  const [providerNum, setProviderNum] = useState(null);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchAccessoryData() {
      axios
        .get("http://localhost:5000/api/accessories/", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setAccessories(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAccessoryData();
  }, [onChange]);

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
  const createNewProvider = () => {
    let loginToken = localStorage.getItem("LoginToken");
    let createNewProvider = new FormData();
    createNewProvider.append("name", providerName);
    createNewProvider.append("phonenumber", providerNum);
    axios
      .post(process.env.REACT_APP_BASE_URL + "providers", createNewProvider, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        console.log(response);
        setOnchange(!onChange);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const createNewType = () => {
  //   let loginToken = localStorage.getItem("LoginToken");
  //   let createNewType = new FormData();
  //   createNewType.append("name", typeName);
  //   axios
  //     .post(process.env.REACT_APP_BASE_URL + "accessorytypes", createNewType, {
  //       headers: {
  //         Authorization: "Bearer " + loginToken,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setOnchange(!onChange);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const CreateAccessory = () => {
    let loginToken = localStorage.getItem("LoginToken");
    console.log("TOKEN " + loginToken);
    let createAccessoryReceipt = new FormData();
    createAccessoryReceipt.append("name", name);
    createAccessoryReceipt.append("quantity", quantity);
    createAccessoryReceipt.append("unit", unit);
    createAccessoryReceipt.append("receipPrice", receipPrice);
    createAccessoryReceipt.append("expiredDate", expiredDate);
    createAccessoryReceipt.append("providerId", providerId);
    createAccessoryReceipt.append("accessoryTypeId", accessoryTypeId);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "api/accessory-receipts/",
        createAccessoryReceipt,
        {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setOnchange(!onChange);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );
  const [openExportForm, setOpenEFModal] = React.useState(false);

  const handleClickOpenEF = () => {
    setOpenEFModal(true);
  };

  const handleCloseEF = () => {
    setOpenEFModal(false);
  };
  const [openImportForm, setOpenIFModal] = React.useState(false);

  const handleClickOpenIF = () => {
    setOpenIFModal(true);
  };

  const handleCloseIF = () => {
    setOpenIFModal(false);
  };

  const [openAddProviderForm, setOpenProviderModal] = React.useState(false);

  const handleOpenProviderForm = () => {
    setOpenProviderModal(true);
  };

  const handleCloseProviderForm = () => {
    setOpenProviderModal(false);
  };

  return (
    <>
      <div className="content">
        {accessories === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Modal isOpen={openExportForm} size="lg">
              <ModalHeader style={{ margin: 25, justifyContent: "center" }}>
                <h3 className="title">Phiếu xuất phụ tùng</h3>
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col className="pr-md-1">
                    <FormGroup>
                      <label>Phụ tùng</label>
                      <Input name="select" id="exampleSelect" type="select">
                        <option>Phụ tùng 1</option>
                        <option>Phụ tùng 2</option>
                        <option>Phụ tùng 3</option>
                        <option>Phụ tùng 4</option>
                        <option>Phụ tùng 5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="2">
                    <FormGroup>
                      <label>Số lượng</label>
                      <Input placeholder="Số lượng" type="number" />
                    </FormGroup>
                  </Col>
                  <Col md="auto" style={{ marginTop: 30 }}>
                    <Tooltip title="Thêm">
                      <Fab
                        onClick={openExportForm}
                        size="small"
                        style={{ marginBottom: 10 }}
                      >
                        <i className="tim-icons icon-simple-add"></i>
                      </Fab>
                    </Tooltip>
                  </Col>
                </Row>
                <Row>
                  <Card style={{ margin: 25 }}>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Phụ tùng</th>
                          <th>Đơn giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Phụ tùng 1</td>
                          <td>100000 VNĐ</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Phụ tùng 3</td>
                          <td>300000 VNĐ</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Phụ tùng 3</td>
                          <td>300000 VNĐ</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Row>
                <ColoredLine color="gray" />
                <Row>
                  <Col>
                    <h4 className="title">Thành tiền</h4>
                  </Col>
                  <Col md="auto">
                    <h4 className="title">700000 VNĐ</h4>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleCloseEF}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleCloseEF}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Xuất
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openImportForm} size="lg">
              <ModalHeader>
                <h4 className="title">Phiếu nhập phụ tùng</h4>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1">
                      <FormGroup>
                        <label>Tên phụ tùng</label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row style={{ justifyContent: "flex-start" }}>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Đơn giá</label>
                        <Input
                          defaultValue="100000"
                          placeholder="Đơn giá"
                          type="text"
                          onChange={(e) => {
                            setReceipPrice(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Số lượng</label>
                        <Input
                          placeholder="Số lượng"
                          type="number"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Thành tiền</label>
                        <Input
                          defaultValue="100000"
                          placeholder="Thành tiền"
                          disabled
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" mx="auto">
                      <FormGroup>
                        <label>Ngày hết hạn</label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            setExpiredDate(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Đơn vị</label>
                        <Input
                          name="select"
                          onChange={(e) => {
                            setUnit(e.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1">
                      <Row style={{ marginLeft: 4 }}>
                        <label>Loại phụ tùng</label>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Input
                              name="select"
                              id="exampleSelect"
                              type="search"
                              value={search}
                              onChange={(e) => {
                                setAccessoryTypeId(e.target.value);
                              }}
                            ></Input>
                            {renderSuggestions()}
                          </FormGroup>
                        </Col>
                        <Col md="auto">
                          <Tooltip title="Thêm loại phụ tùng">
                            <Fab size="small">
                              <i className="tim-icons icon-simple-add"></i>
                            </Fab>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1">
                      <label>Nhà cung cấp</label>
                      <Row>
                        <Col className="pr-md-1">
                          <FormGroup>
                            <Input
                              type="select"
                              onChange={(e) => {
                                setProviderId(e.target.value);
                              }}
                            >
                              <option>Ncc1</option>
                              <option>Ncc2</option>
                              <option>Ncc3</option>
                              <option>Ncc4;</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="auto" mx="auto">
                          <Tooltip title="Thêm nhà cung cấp">
                            <Fab size="small" onClick={handleOpenProviderForm}>
                              <i className="tim-icons icon-simple-add"></i>
                            </Fab>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <label>Mô tả</label>
                  <TextField
                    placeholder="Mô tả"
                    multiline
                    fullWidth
                    rowsMax={4}
                    variant="outlined"
                  />
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleCloseIF}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={CreateAccessory}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Nhập phụ tùng
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={openAddProviderForm} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thêm loại phụ tùng
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 10, marginRight: 10 }}>
                  <FormGroup>
                    <label>Loại phụ tùng</label>
                    <Input
                      name="select"
                      id="exampleSelect"
                      type="search"
                      value={search}
                      onChange={(e) => {
                        setProviderName(e.target.value);
                      }}
                    ></Input>
                    {renderSuggestions()}
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  // onClick={AddNewCustomer}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseProviderForm}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={openAddProviderForm} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thêm nhà cung cấp
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 10, marginRight: 10 }}>
                  <FormGroup>
                    <label>Tên nhà cung cấp</label>
                    <Input
                      placeholder="Tên"
                      type="text"
                      onChange={(e) => {
                        setProviderName(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                    <Input
                      placeholder="Số điện thoại"
                      type="text"
                      onChange={(e) => {
                        setProviderNum(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={createNewProvider}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseProviderForm}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            <div className="content">
              <Row>
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <Row
                        style={{ margin: 25, justifyContent: "space-between" }}
                      >
                        <CardTitle tag="h4">Danh sách phụ tùng</CardTitle>
                        <Col md="auto">
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="submit"
                            onClick={handleClickOpenIF}
                            style={{ margin: 2 }}
                          >
                            Nhập phụ tùng
                          </Button>
                          <Button
                            className="btn-fill"
                            color="primary"
                            type="submit"
                            onClick={handleClickOpenEF}
                          >
                            Xuất phụ tùng
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>STT</th>
                            <th>Tên phụ tùng</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th>Giá nhập vào</th>
                            <th>Giá bán</th>
                            <th>Ngày hết hạn</th>
                            <th>Nhà cung cấp</th>
                            <th>Loại phụ tùng</th>
                            <th>Mô tả</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accessories.map((accessory, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{accessory.name}</td>
                              <td>
                                {accessory.quantity ? accessory.quantity : "-"}
                              </td>
                              <td>{accessory.unit ? accessory.unit : "-"}</td>
                              <td>
                                {accessory.receiptPrice
                                  ? accessory.receiptPrice
                                  : "-"}
                              </td>
                              <td>
                                {accessory.issuePrice
                                  ? accessory.issuePrice
                                  : "-"}
                              </td>
                              <td>
                                {accessory.expiredDate
                                  ? accessory.expiredDate
                                  : "-"}
                              </td>
                              <td>
                                {accessory.provider.name
                                  ? accessory.provider.name
                                  : "-"}
                              </td>
                              <td>
                                {accessory.accessoryType.name
                                  ? accessory.accessoryType.name
                                  : "-"}
                              </td>
                              <td>
                                {accessory.description
                                  ? accessory.description
                                  : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Accessories;
