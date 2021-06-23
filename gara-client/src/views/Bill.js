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
  const [onChange, setOnChange] = useState(false);

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
    async function fetchBillData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/bills", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setListBill(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchBillData();
    fetchAccessoriesData();
  }, [onChange]);

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
          <p>Bạn không có quyền truy cập</p>
        ) : listBill.length < 1 ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Row>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Danh sách hóa đơn</CardTitle>
                  <Row>
                    <Col md="2">
                      <Input
                        type="select"
                        defaultValue={"1"}
                        onChange={(e) => getSearchField(e)}
                      >
                        <option value="1">Tên khách hàng</option>
                        <option value="2">Số điện thoại</option>
                        <option value="3">Ngày thanh toán</option>
                        <option value="4">Tổng tiền</option>
                      </Input>
                    </Col>
                    <Col md="3" hidden={isDateSearch}>
                      <Input
                        value={searchTerm}
                        type="text"
                        placeholder="Tìm kiếm hóa đơn"
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
                      Không tìm thấy hóa đơn phù hợp
                    </p>
                  ) : (
                    <table class="table">
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Ngày thanh toán</th>
                          <th>Thành tiền (VNĐ)</th>
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
                <h3 className="title">Hóa đơn</h3>
              </ModalHeader>
              <ModalBody>
                {selectedBill !== null ? (
                  <div>
                    <Row>
                      <Col>
                        <h4 className="title">Khách hàng</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">Địa chỉ</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.address}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">Số điện thoại</h4>
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
                                Danh sách phụ tùng
                              </p>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <table class="table" responsive>
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
                            {selectedBill.details.length > 0 ? (
                              selectedBill.details.map((QD, index) => (
                                <tbody>
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                      {
                                        listAccessoryDB.find(
                                          (acc) => acc.id === QD.accessoryId
                                        ).name
                                      }
                                    </td>
                                    <td>{QD.quantity}</td>
                                    <td>{QD.unitPrice} VNĐ</td>
                                    <td>
                                      {QD.issueName != null
                                        ? QD.issueName
                                        : "Không có"}
                                    </td>
                                    <td>
                                      {QD.laborCost != null ? QD.laborCost : 0}{" "}
                                      VNĐ
                                    </td>
                                    <td>
                                      {QD.laborCost != null
                                        ? Number(QD.quantity) *
                                            Number(QD.unitPrice) +
                                          Number(QD.laborCost)
                                        : Number(QD.quantity) *
                                          Number(QD.unitPrice)}
                                      VNĐ
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
                        <h4 className="title">Thành tiền</h4>
                      </Col>
                      <Col md="auto">
                        <h4 className="title">
                          {selectedBill.totalAmount} VNĐ
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="auto">
                        <h4>Nhân viên tạo phiếu:</h4>
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
