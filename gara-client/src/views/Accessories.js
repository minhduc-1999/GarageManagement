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
import { Tooltip, Fab, TextField } from "@material-ui/core";
import dateFormat from "dateformat";
const axios = require("axios");

export function validateAccessories(accessory) {
    var quantityRegExp = new RegExp("^[0-9]+$");
    var receiptPriceRegExp = new RegExp("^[0-9]+$");

    if (accessory.name && accessory.name !=="" &&
    quantityRegExp.test(accessory.quantity) &&
    accessory.unit && accessory.unit!=="" &&
    receiptPriceRegExp.test(accessory.receiptPrice) &&
    accessory.expiredTime && accessory.expiredTime !=="" &&
    accessory.accessoryproviderId && accessory.accessoryproviderId !=="" &&
    accessory.accessoryTypeId && accessory.accessoryTypeId !==""
    ) {
      return true;
    }
    return false;

}

export function validateProvider(provider) {

  var phoneNumberRegExp = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
  );

  if (
    provider.providerName &&
    provider.providerName !== "" &&
    phoneNumberRegExp.test(provider.providerNum) &&
    provider.address &&
    provider.address !== ""
  ) {
    return true;
  }
  return false;
}

function Accessories() {
  const [onChange, setOnchange] = useState(false);
  const [accessories, setAccessories] = useState(null);
  const [newAccessories, setNewAccessories] = useState([]);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [receiptPrice, setReceiptPrice] = useState(null);
  const [expiredTime, setExpiredTime] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [accessoryTypeId, setAccessoryTypeId] = useState(null);
  const [description, setDescription] = useState(null);

  const [provider, setProvider] = useState([]);
  const [accessoryType, setAccessoryType] = useState([]);
  const [typeName, setAccessoryTypeName] = useState(null);
  const [providerName, setProviderName] = useState(null);
  const [providerAddress, setProviderAdd] = useState(null);
  const [providerNum, setProviderNum] = useState(null);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [emptyFieldAlertProvider, setEmptyFieldAlertProvider] = useState(false);
  const [emptyFieldAlertType, setEmptyFieldAlertType] = useState(false);

  const [emptyAlert, setEmptyAlert] = useState(false);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchAccessoryData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/accessories/", {
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
    async function fetchProviderData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/providers", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setProvider(data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchAccessoryTypeData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/accessorytypes", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setAccessoryType(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAccessoryData();
    fetchProviderData();
    fetchAccessoryTypeData();
  }, [onChange]);

  const clearIFFields = () => {
    setName(null);
    setQuantity(null);
    setUnit(null);
    setReceiptPrice(null);
    setExpiredTime(null);
    setProviderId(null);
    setAccessoryTypeId(null);
    setDescription(null);
  };
  const onDismiss = () => setEmptyFieldAlert(!emptyFieldAlert);
  const onDismissType = () => setEmptyFieldAlertType(!emptyFieldAlertType);
  const onDismissProvider = () => setEmptyFieldAlertProvider(!emptyFieldAlertProvider);
  const onDismissList = () => setEmptyAlert(!emptyAlert);

  const createNewProvider = () => {
    if (!validateProvider({
      providerName: providerName,
      providerNum: providerNum,
      address: providerAddress
    })
    ) {
      return;
    }
    {
      let loginToken = localStorage.getItem("LoginToken");
      let createNewProvider = new FormData();
      createNewProvider.append("Name", providerName);
      createNewProvider.append("PhoneNumber", providerNum);
      createNewProvider.append("Address", providerAddress);
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "api/providers",
          createNewProvider,
          {
            headers: {
              Authorization: "Bearer " + loginToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setEmptyFieldAlertProvider(false);
          setOnchange(!onChange);
          setOpenProviderModal(false);
        })
        .catch((error) => {
          console.log(error);
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
          setEmptyFieldAlertProvider(true);
        });
    }
  };

  const createNewType = () => {
    if (!typeName) {
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let createNewType = new FormData();
    createNewType.append("Name", typeName);
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "api/accessorytypes",
        createNewType,
        {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setOnchange(!onChange);
        setEmptyFieldAlertType(false);
        setOpenAddAccessoryTypeModal(false);
      })
      .catch((error) => {
        setEmptyFieldAlertType(true);
        console.log(error);
      });
  };

  const CreateAccessory = () => {
    if (newAccessories) {
      let loginToken = localStorage.getItem("LoginToken");
      const accessoryReceiptData = newAccessories;
      axios
        .post(
          process.env.REACT_APP_BASE_URL + "api/accessory-receipts/",
          accessoryReceiptData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + loginToken,
            },
          }
        )

        .then((response) => {
          console.log(response);
          setOnchange(!onChange);
          setEmptyAlert(false);
          setOpenIFModal(false);
        })
        .catch((error) => {
          console.log(error.response);
          setEmptyAlert(true);
        });
      setNewAccessories([]);
    }
  };
  const addNewAccessory = () => {
    if ( !validateAccessories({
      name: name,
      quantity: quantity,
      unit: unit,
      receiptPrice: receiptPrice,
      expiredTime: expiredTime,
      providerId: providerId,
      accessoryTypeId: accessoryTypeId
    })) {
      setEmptyFieldAlert(true);
    } else {
      setNewAccessories([
        ...newAccessories,
        {
          Name: name,
          Quantity: quantity,
          Unit: unit,
          ReceiptPrice: receiptPrice,
          expiredTime: expiredTime,
          ProviderId: providerId,
          AccessoryTypeId: accessoryTypeId,
          Description: description,
        },
      ]);
      clearIFFields();
    }
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

  const [openImportForm, setOpenIFModal] = React.useState(false);

  const handleClickOpenIF = () => {
    setEmptyFieldAlert(false);
    setEmptyAlert(false);
    setOpenIFModal(true);
  };

  const handleCloseIF = () => {
    setOpenIFModal(false);
  };

  const [openAddProviderForm, setOpenProviderModal] = React.useState(false);
  const [openAddAccessoryTypeForm, setOpenAddAccessoryTypeModal] =
    React.useState(false);

  const handleOpenProviderForm = () => {
    setEmptyFieldAlertProvider(false);
    setOpenProviderModal(true);
  };

  const handleCloseProviderForm = () => {
    setOpenProviderModal(false);
  };

  const handleOpenAddAccessoryTypeModal = () => {
    setEmptyFieldAlertType(false);
    setOpenAddAccessoryTypeModal(true);
  };

  const handleCloseAddAccessoryTypeModal = () => {
    setOpenAddAccessoryTypeModal(false);
  };

  return (
    <>
      <div className="content">
        <div>
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
                        value={name ? name : ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "flex-start" }}>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Đơn giá</label>
                      <Input
                        value={receiptPrice ? receiptPrice : ""}
                        placeholder="Đơn giá"
                        type="text"
                        onChange={(e) => {
                          setReceiptPrice(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="2">
                    <FormGroup>
                      <label>Số lượng</label>
                      <Input
                        value={quantity ? quantity : ""}
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
                        value={receiptPrice * quantity}
                        placeholder="Thành tiền"
                        disabled
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" mx="auto">
                    <FormGroup>
                      <label>Hạn sử dụng (năm)</label>
                      <Input
                        value={expiredTime ? expiredTime : ""}
                        placeholder="Hạn sử dụng"
                        type="date"
                        onChange={(e) => {
                          setExpiredTime(e.target.value);
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
                        value={unit ? unit : ""}
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
                            defaultValue={"DEFAULT"}
                            value={
                              accessoryTypeId ? accessoryTypeId : "DEFAULT"
                            }
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={(e) => {
                              setAccessoryTypeId(e.target.value);
                            }}
                          >
                            <option value="DEFAULT" disabled>
                              Loại phụ tùng
                            </option>
                            {accessoryType
                              ? accessoryType.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))
                              : []}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="auto">
                        <Tooltip title="Thêm loại phụ tùng">
                          <Fab
                            size="small"
                            onClick={handleOpenAddAccessoryTypeModal}
                          >
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
                            name="select"
                            id="exampleSelect"
                            value={providerId ? providerId : "DEFAULT"}
                            onChange={(e) => setProviderId(e.target.value)}
                          >
                            <option value="DEFAULT" disabled>
                              Nhà cung cấp
                            </option>

                            {provider
                              ? provider.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))
                              : []}
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
                  value={description ? description : ""}
                  rowsMax={4}
                  variant="outlined"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 25 }}
                onClick={addNewAccessory}
              >
                Thêm phụ tùng
              </Button>
              <Alert color="danger" isOpen={emptyFieldAlert} toggle={onDismiss}>
                Bạn chưa nhập đủ các trường!
              </Alert>

              <ColoredLine></ColoredLine>
              {!newAccessories ? (
                <p>Chưa có dữ liệu...</p>
              ) : (
                <Row>
                  <Card style={{ margin: 25 }}>
                    <table className="table table-borderless table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>Số thứ tự</th>
                          <th>Tên Phụ tùng</th>
                          <th>Số lượng</th>
                          <th>Đơn vị</th>
                          <th>Đơn giá</th>
                          <th>Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newAccessories.map((accessory, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{accessory.Name}</td>
                            <td>
                              {accessory.Quantity ? accessory.Quantity : "-"}
                            </td>
                            <td>{accessory.Unit ? accessory.Unit : "-"}</td>
                            <td>
                              {accessory.ReceiptPrice
                                ? accessory.ReceiptPrice
                                : "-"}
                            </td>
                            <td>
                              {accessory.ReceiptPrice && accessory.Quantity
                                ? accessory.ReceiptPrice * accessory.Quantity
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Alert color="danger" isOpen={emptyAlert} toggle={onDismissList}>
                      Danh sách phụ tùng trống!
                    </Alert>
                  </Card>
                </Row>
              )}
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

          <Modal isOpen={openAddAccessoryTypeForm} size="sm">
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
                    type="text"
                    onChange={(e) => {
                      setAccessoryTypeName(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <Alert color="danger" isOpen={emptyFieldAlertType} toggle={onDismissType}>
              Bạn chưa nhập đủ các trường hoặc loại phụ tùng đã tồn tại!
            </Alert>{" "}
            <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
              <Button
                onClick={createNewType}
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 25 }}
              >
                Thêm
              </Button>
              <Button
                onClick={handleCloseAddAccessoryTypeModal}
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
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Địa chỉ</label>
                  <Input
                    placeholder="Địa chỉ"
                    type="text"
                    onChange={(e) => {
                      setProviderAdd(e.target.value);
                    }}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <Alert color="danger" isOpen={emptyFieldAlertProvider} toggle={onDismissProvider}>
              Bạn chưa nhập đủ các trường hoặc nhà cung cấp đã tồn tại!
            </Alert>
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
                      </Col>
                    </Row>
                  </CardHeader>
                  {accessories === null ? (
                    <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
                  ) : (
                    <CardBody>
                      <table className="table table-borderless table-hover">
                        <thead className="text-primary">
                          <tr>
                            <th>STT</th>
                            <th>Tên phụ tùng</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th>Giá nhập vào</th>
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
                                  : "-"} VNĐ
                              </td>
                              <td>
                                {accessory.expiredDate
                                  ? dateFormat(
                                      accessory.expiredDate,
                                      "dd/mm/yyyy"
                                    )
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
                      </table>
                    </CardBody>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accessories;
