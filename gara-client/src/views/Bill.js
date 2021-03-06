import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import { AuthContext } from "contexts/AuthProvider";

const axios = require("axios");
const dateFormat = require("dateformat");

function Bill() {
  const { userAcc } = useContext(AuthContext);

  const [listBill, setListBill] = useState([]);
  const [listAccessoryDB, setListAccessoryDB] = useState(null);

  const [openInvoice, setOpenInvoice] = useState(false);

  const [selectedBill, setSelectedBill] = useState(null);

  //searchCombo-start
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [searchField, setSearchField] = useState("1");

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
    if (e.target.value === "3") {
      var today = new Date();
      var currentDate = today.toISOString().substring(0, 10);
      document.getElementById("searhDate").value = currentDate;
      setIsDateSearch(true);
      filterBillByDate(document.getElementById("searhDate").value);
    } else {
      setIsDateSearch(false);
    }
  };

  const filterBillByDate = (date) => {
    if (date !== null) {
      const newBillList = listBill.filter((bill) => {
        return (
          dateFormat(Object.values(bill)[3].createdDate, "dd/mm/yyyy") ===
          dateFormat(date, "dd/mm/yyyy")
        );
      });
      setSearchResult(newBillList);
    } else {
      setSearchResult(listBill);
    }
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      console.log(e.target.value);
      listBill.map((bill) => console.log(bill.customer.name));
      let newBillList = [];
      switch (searchField) {
        case "1":
          newBillList = listBill.filter((bill) => {
            return (bill.customer.name + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "2":
          newBillList = listBill.filter((bill) => {
            return (bill.customer.phoneNumber + "").includes(e.target.value);
          });
          break;
        case "4":
          newBillList = listBill.filter((bill) => {
            return (bill.totalAmount + "").includes(e.target.value);
          });
          break;
        default:
          break;
      }
      setSearchResult(newBillList);
    } else {
      setSearchResult(listBill);
    }
  };
  //searchCombo-end

  const renderBills = () =>
    (searchTerm.length < 1 && searchField !== "3"
      ? listBill
      : searchResult
    ).map((bill, index) => {
      return (
        <tr key={index} onDoubleClick={() => openSelectedInvoice(bill)}>
          <th scope="row">{index + 1}</th>
          <td>{bill.customer.name}</td>
          <td>{bill.customer.phoneNumber}</td>
          <td>{dateFormat(bill.createdDate, "dd/mm/yyyy")}</td>
          <td>{bill.totalAmount}</td>
        </tr>
      );
    });

  const openSelectedInvoice = (bill) => {
    setSelectedBill(bill);
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setSelectedBill(null);
    setOpenInvoice(false);
  };

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    // async function fetchAccessoriesData() {
    //   axios
    //     .get(process.env.REACT_APP_BASE_URL + "api/accessories", {
    //       headers: {
    //         Authorization: "Bearer " + loginToken,
    //       },
    //     })
    //     .then((response) => {
    //       return response.data;
    //     })
    //     .then((data) => {
    //       setListAccessoryDB(data);
    //     })
    //     .catch((error) => console.log(error));
    // }
    async function fetchBillData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/bills/all", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setListBill(data.list);
          setListAccessoryDB(data.attach);
        })
        .catch((error) => console.log(error));
    }
    fetchBillData();
    //fetchAccessoriesData();
    // eslint-disable-next-line
  }, []);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  return (
    <>
      <div className="content">
        {userAcc.role !== "admin" && userAcc.role !== "manager" ? (
          <p>B???n kh??ng c?? quy???n truy c???p</p>
        ) : listBill.length < 1 ? (
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <div>
            <Row>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Danh s??ch h??a ????n</CardTitle>
                  <Row>
                    <Col md="2">
                      <Input
                        type="select"
                        defaultValue={"1"}
                        onChange={(e) => getSearchField(e)}
                      >
                        <option value="1">T??n kh??ch h??ng</option>
                        <option value="2">S??? ??i???n tho???i</option>
                        <option value="3">Ng??y thanh to??n</option>
                        <option value="4">T???ng ti???n</option>
                      </Input>
                    </Col>
                    <Col md="3" hidden={isDateSearch}>
                      <Input
                        value={searchTerm}
                        type="text"
                        placeholder="T??m ki???m h??a ????n"
                        onChange={(e) => getSearchTerm(e)}
                      />
                    </Col>
                    <Col md="3" hidden={!isDateSearch}>
                      <Input
                        id="searhDate"
                        type="date"
                        onChange={(e) => filterBillByDate(e.target.value)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {renderBills().length <= 0 ? (
                    <p style={{ fontSize: 20, marginLeft: 10 }}>
                      Kh??ng t??m th???y h??a ????n ph?? h???p
                    </p>
                  ) : (
                    <table class="table table-borderless table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>T??n kh??ch h??ng</th>
                          <th>S??? ??i???n tho???i</th>
                          <th>Ng??y thanh to??n</th>
                          <th>Th??nh ti???n (VN??)</th>
                        </tr>
                      </thead>
                      <tbody>{renderBills()}</tbody>
                    </table>
                  )}
                </CardBody>
              </Card>
            </Row>
            <Modal isOpen={openInvoice} size="lg">
              <ModalHeader style={{ margin: 25, justifyContent: "center" }}>
                <h3 className="title">H??a ????n</h3>
              </ModalHeader>
              <ModalBody>
                {selectedBill !== null ? (
                  <div>
                    <Row>
                      <Col>
                        <h4 className="title">Kh??ch h??ng</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">?????a ch???</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.address}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">S??? ??i???n tho???i</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.phoneNumber}</h4>
                      </Col>
                    </Row>
                    <ColoredLine color="gray" />
                    <Row>
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col>
                              <p style={{ fontSize: 18 }} className="title">
                                Danh s??ch ph??? t??ng
                              </p>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <table class="table table-borderless table-hover">
                            <thead className="text-primary">
                              <tr>
                                <th>ID</th>
                                <th>Ph??? t??ng</th>
                                <th>S??? l?????ng</th>
                                <th>????n gi??</th>
                                <th>Lo???i l???i</th>
                                <th>Ph?? s???a ch???a</th>
                                <th>T???ng ti???n</th>
                              </tr>
                            </thead>
                            {selectedBill.details.length > 0 ? (
                              selectedBill.details.map((QD, index) => (
                                <tbody>
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{listAccessoryDB[QD.accessoryId]}</td>
                                    <td>{QD.quantity}</td>
                                    <td>{QD.unitPrice} VN??</td>
                                    <td>
                                      {QD.issueName != null
                                        ? QD.issueName
                                        : "Kh??ng c??"}
                                    </td>
                                    <td>
                                      {QD.laborCost != null ? QD.laborCost : 0}{" "}
                                      VN??
                                    </td>
                                    <td>
                                      {QD.laborCost != null
                                        ? Number(QD.quantity) *
                                            Number(QD.unitPrice) +
                                          Number(QD.laborCost)
                                        : Number(QD.quantity) *
                                          Number(QD.unitPrice)}
                                      VN??
                                    </td>
                                  </tr>
                                </tbody>
                              ))
                            ) : (
                              <tbody></tbody>
                            )}
                          </table>
                        </CardBody>
                      </Card>
                    </Row>
                    <ColoredLine color="gray" />
                    <Row>
                      <Col>
                        <h4 className="title">Th??nh ti???n</h4>
                      </Col>
                      <Col md="auto">
                        <h4 className="title">
                          {selectedBill.totalAmount} VN??
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="auto">
                        <h4>Nh??n vi??n t???o phi???u:</h4>
                      </Col>
                      <Col>
                        <h4>{selectedBill.creator.fullName}</h4>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div hidden="true"></div>
                )}
              </ModalBody>
              <ModalFooter style={{ margin: 10, justifyContent: "flex-end" }}>
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
          </div>
        )}
      </div>
    </>
  );
}

export default Bill;
