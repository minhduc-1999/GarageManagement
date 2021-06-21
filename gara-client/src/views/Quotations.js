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
  FormGroup,
  Form,
  Input,
} from "reactstrap";
const axios = require("axios");
const dateFormat = require("dateformat");

function Quotations() {
  const [onChange, setOnchange] = useState(false);
  const [RRList, setRRList] = useState([]);
  const [confirmedRRList, setConfirmedRRList] = useState([]);
  const [listCar, setListCar] = useState([]);
  const [selectedRR, setSelectedRR] = useState(null);
  const [openQuotation, setOpenQuotation] = useState(false);
  const [listAccessoryDB, setListAccessoryDB] = useState([]);

  //searchCombo-start
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [searchField, setSearchField] = useState("1");

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
    if (e.target.value === "2") {
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
      const newQuotationList = confirmedRRList.filter((RR) => {
        return (
          (dateFormat(RR.createdDate, "dd/mm/yyyy") + "").toString() ===
          (dateFormat(date, "dd/mm/yyyy") + "").toString()
        );
      });
      setSearchResult(newQuotationList);
    } else {
      setSearchResult(confirmedRRList);
    }
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      console.log(e.target.value);
      let newRRList = [];
      switch (searchField) {
        case "1":
          newRRList = confirmedRRList.filter((RR) => {
            return (
              listCar.find((car) => car.id === RR.carId)?.brand +
              "-" +
              listCar.find((car) => car.id === RR.carId)?.model +
              " " +
              listCar.find((car) => car.id === RR.carId)?.numberPlate
            )
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "3":
          newRRList = confirmedRRList.filter((RR) => {
            return (RR.totalAmount + "").includes(e.target.value);
          });
          break;
          break;

        default:
          break;
      }
      setSearchResult(newRRList);
    } else {
      setSearchResult(confirmedRRList);
    }
  };
  //searchCombo-end

  const renderConfirmRR = () =>
    (searchTerm.length < 1 && searchField !== "2"
      ? confirmedRRList
      : searchResult
    ).map((RR, index) => {
      return (
        <tr
          key={index}
          onDoubleClick={() => {
            OpenQuotation(RR);
          }}
        >
          <th scope="row">{index + 1}</th>
          <td>{dateFormat(RR.createdDate, "dd/mm/yyyy")}</td>

          <td>
            {listCar.find((car) => car.id === RR.carId).brand}-
            {listCar.find((car) => car.id === RR.carId).model}{" "}
            {listCar.find((car) => car.id === RR.carId).numberPlate}
          </td>
          <td>{RR.totalAmount}</td>
        </tr>
      );
    });

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
    if (RRList.length > 0) {
      setConfirmedRRList(
        RRList.filter((RR) => RR.quotation.state === "confirmed")
      );
    }
  }, [RRList]);

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
          setListCar(response.data);
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
    async function fetchRRData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/repairedrequests", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setRRList(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchCarData();
    fetchAccessoriesData();
    fetchRRData();
  }, [onChange]);

  const OpenQuotation = (RR) => {
    setOpenQuotation(true);
    setSelectedRR(RR);
  };

  const CloseQuotation = () => {
    setOpenQuotation(false);
    setSelectedRR(null);
  };

  const calcTempQuotationTotal = () => {
    if (selectedRR === null) {
      return 0;
    } else {
      let total = 0;
      selectedRR.quotation.details.map((QD) => {
        if (!QD.hasOwnProperty("laborCosts")) {
          total = Number(total) + Number(QD.quantity) * Number(QD.unitPrice);
        } else {
          total =
            Number(total) +
            Number(QD.quantity) * Number(QD.unitPrice) +
            Number(QD.laborCost);
        }
      });
      return total;
    }
  };

  return (
    <>
      <div className="content">
        {confirmedRRList.length < 1 ||
        listCar.length < 1 ||
        listAccessoryDB.length < 1 ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Modal isOpen={openQuotation} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phiếu báo giá dịch vụ
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <ColoredLine color="grey" />
                  <table class="table">
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

                    {selectedRR !== null ? (
                      <tbody>
                        {selectedRR.quotation.details.map((QD, index) => (
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
                              {QD.issueName != null ? QD.issueName : "Không có"}
                            </td>
                            <td>
                              {QD.laborCost != null ? QD.laborCost : 0} VNĐ
                            </td>
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
                    ) : (
                      <tbody></tbody>
                    )}
                  </table>
                  <ColoredLine color="grey" />
                  <Row>
                    <Col>
                      <FormGroup>
                        <h3>Tổng cộng</h3>
                      </FormGroup>
                    </Col>
                    <Row>
                      <Col md="auto" style={{ marginRight: 25 }}>
                        <h3 className="title">
                          {calcTempQuotationTotal()} VNĐ
                        </h3>
                      </Col>
                    </Row>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 10, justifyContent: "flex-end" }}>
                <Button
                  onClick={CloseQuotation}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 20 }}
                >
                  Hủy
                </Button>
                <Button
                  //onClick={}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Xuất phụ tùng
                </Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                      <CardTitle tag="h4">Danh sách báo giá</CardTitle>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input
                          type="select"
                          defaultValue={"1"}
                          onChange={(e) => getSearchField(e)}
                        >
                          <option value="1">Xe</option>
                          <option value="2">Ngày tạo</option>
                          <option value="3">Tổng chi phí</option>
                        </Input>
                      </Col>
                      <Col md="3" hidden={isDateSearch}>
                        <Input
                          value={searchTerm}
                          type="text"
                          placeholder="Tìm kiếm báo giá"
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
                    {renderConfirmRR().length <= 0 ? (
                      <p style={{ fontSize: 20, marginLeft: 10 }}>
                        Không tìm thấy báo giá phù hợp
                      </p>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th width={50}>ID</th>
                            <th>Ngày tạo</th>
                            <th>Xe</th>
                            <th>Tổng chi phí</th>
                          </tr>
                        </thead>
                        <tbody>{renderConfirmRR()}</tbody>
                      </table>
                    )}
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

export default Quotations;
