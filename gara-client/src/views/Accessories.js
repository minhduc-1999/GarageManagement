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
  const createNewProvider = () => {
    if (!providerName || !providerNum || !providerAddress) {
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
    if (
      !name ||
      !quantity ||
      !unit ||
      !receiptPrice ||
      !expiredTime ||
      !providerId ||
      !accessoryTypeId
    ) {
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
              <h4 className="title">Phi???u nh???p ph??? t??ng</h4>
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col className="pr-md-1">
                    <FormGroup>
                      <label>T??n ph??? t??ng</label>
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
                      <label>????n gi??</label>
                      <Input
                        value={receiptPrice ? receiptPrice : ""}
                        placeholder="????n gi??"
                        type="text"
                        onChange={(e) => {
                          setReceiptPrice(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="2">
                    <FormGroup>
                      <label>S??? l?????ng</label>
                      <Input
                        value={quantity ? quantity : ""}
                        placeholder="S??? l?????ng"
                        type="number"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Th??nh ti???n</label>
                      <Input
                        value={receiptPrice * quantity}
                        placeholder="Th??nh ti???n"
                        disabled
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" mx="auto">
                    <FormGroup>
                      <label>H???n s??? d???ng (n??m)</label>
                      <Input
                        value={expiredTime ? expiredTime : ""}
                        placeholder="H???n s??? d???ng"
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
                      <label>????n v???</label>
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
                      <label>Lo???i ph??? t??ng</label>
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
                              Lo???i ph??? t??ng
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
                        <Tooltip title="Th??m lo???i ph??? t??ng">
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
                    <label>Nh?? cung c???p</label>
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
                              Nh?? cung c???p
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
                        <Tooltip title="Th??m nh?? cung c???p">
                          <Fab size="small" onClick={handleOpenProviderForm}>
                            <i className="tim-icons icon-simple-add"></i>
                          </Fab>
                        </Tooltip>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <label>M?? t???</label>
                <TextField
                  placeholder="M?? t???"
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
                Th??m ph??? t??ng
              </Button>
              <Alert color="danger" isOpen={emptyFieldAlert}>
                B???n ch??a nh???p ????? c??c tr?????ng!
              </Alert>
              <ColoredLine></ColoredLine>
              {!newAccessories ? (
                <p>Ch??a c?? d??? li???u...</p>
              ) : (
                <Row>
                  <Card style={{ margin: 25 }}>
                    <table className="table table-borderless table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>S??? th??? t???</th>
                          <th>T??n Ph??? t??ng</th>
                          <th>S??? l?????ng</th>
                          <th>????n v???</th>
                          <th>????n gi??</th>
                          <th>Th??nh ti???n</th>
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
                    <Alert color="danger" isOpen={emptyAlert}>
                      Danh s??ch ph??? t??ng tr???ng!
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
                H???y
              </Button>
              <Button
                onClick={CreateAccessory}
                className="btn-fill"
                color="primary"
                type="submit"
              >
                Nh???p ph??? t??ng
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={openAddAccessoryTypeForm} size="sm">
            <ModalHeader>
              <p style={{ fontSize: 22 }} className="title">
                Th??m lo???i ph??? t??ng
              </p>
            </ModalHeader>
            <ModalBody>
              <Form style={{ marginLeft: 10, marginRight: 10 }}>
                <FormGroup>
                  <label>Lo???i ph??? t??ng</label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setAccessoryTypeName(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <Alert color="danger" isOpen={emptyFieldAlertType}>
              B???n ch??a nh???p ????? c??c tr?????ng ho???c lo???i ph??? t??ng ???? t???n t???i!
            </Alert>{" "}
            <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
              <Button
                onClick={createNewType}
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 25 }}
              >
                Th??m
              </Button>
              <Button
                onClick={handleCloseAddAccessoryTypeModal}
                className="btn-fill"
                color="primary"
                type="submit"
              >
                H???y
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={openAddProviderForm} size="sm">
            <ModalHeader>
              <p style={{ fontSize: 22 }} className="title">
                Th??m nh?? cung c???p
              </p>
            </ModalHeader>
            <ModalBody>
              <Form style={{ marginLeft: 10, marginRight: 10 }}>
                <FormGroup>
                  <label>T??n nh?? cung c???p</label>
                  <Input
                    placeholder="T??n"
                    type="text"
                    onChange={(e) => {
                      setProviderName(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">S??? ??i???n tho???i</label>
                  <Input
                    placeholder="S??? ??i???n tho???i"
                    type="text"
                    onChange={(e) => {
                      setProviderNum(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">?????a ch???</label>
                  <Input
                    placeholder="?????a ch???"
                    type="text"
                    onChange={(e) => {
                      setProviderAdd(e.target.value);
                    }}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <Alert color="danger" isOpen={emptyFieldAlertProvider}>
              B???n ch??a nh???p ????? c??c tr?????ng ho???c nh?? cung c???p ???? t???n t???i!
            </Alert>
            <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
              <Button
                onClick={createNewProvider}
                className="btn-fill"
                color="primary"
                type="submit"
                style={{ marginRight: 25 }}
              >
                Th??m
              </Button>
              <Button
                onClick={handleCloseProviderForm}
                className="btn-fill"
                color="primary"
                type="submit"
              >
                H???y
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
                      <CardTitle tag="h4">Danh s??ch ph??? t??ng</CardTitle>
                      <Col md="auto">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={handleClickOpenIF}
                          style={{ margin: 2 }}
                        >
                          Nh???p ph??? t??ng
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  {accessories === null ? (
                    <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
                  ) : (
                    <CardBody>
                      <table className="table table-borderless table-hover">
                        <thead className="text-primary">
                          <tr>
                            <th>STT</th>
                            <th>T??n ph??? t??ng</th>
                            <th>S??? l?????ng</th>
                            <th>????n v???</th>
                            <th>Gi?? nh???p v??o</th>
                            <th>Ng??y h???t h???n</th>
                            <th>Nh?? cung c???p</th>
                            <th>Lo???i ph??? t??ng</th>
                            <th>M?? t???</th>
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
                                  : "-"} VN??
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
