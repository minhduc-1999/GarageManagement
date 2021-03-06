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
  Alert,
} from "reactstrap";

const axios = require("axios");
const dateFormat = require("dateformat");

function Quotations() {
  const [RRList, setRRList] = useState([]);
  const [confirmedRRList, setConfirmedRRList] = useState([]);
  const [listCar, setListCar] = useState([]);
  const [selectedRR, setSelectedRR] = useState(null);
  const [openQuotation, setOpenQuotation] = useState(false);
  const [openExportForm, setExportModal] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [emptyReceiverAlert, setEmptyReceiverAlert] = useState(false);
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
  const ExportAccessoriesIssue = () => {
    if (selectedRR) {
      if (!receiver) {
        setEmptyReceiverAlert(true);
      } else {
        setEmptyReceiverAlert(false);
        let loginToken = localStorage.getItem("LoginToken");
        const accessoryIssueData = {
          RepairedRequestId: selectedRR.id,
          Receiver: receiver,
        };
        axios
          .post(
            process.env.REACT_APP_BASE_URL + "api/accessory-issues/",
            accessoryIssueData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + loginToken,
              },
            }
          )
          .then((response) => {
            console.log(response);
            setExportModal(false);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
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
    async function fetchRRData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/repairedrequests/all", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setListAccessoryDB(data.attach);
          setRRList(data.list);
        })
        .catch((error) => console.log(error));
    }
    fetchCarData();
    //fetchAccessoriesData();
    fetchRRData();
    // eslint-disable-next-line
  }, []);

  const OpenQuotation = (RR) => {
    setOpenQuotation(true);
    setSelectedRR(RR);
  };

  const CloseQuotation = () => {
    setOpenQuotation(false);
    setSelectedRR(null);
  };
  const handleOpenEF = () => {
    setEmptyReceiverAlert(false);
    setExportModal(true);
  };

  const handleCloseEF = () => {
    setEmptyReceiverAlert(false);
    setExportModal(false);
  };

  const calcTempQuotationTotal = () => {
    if (selectedRR === null) {
      return 0;
    } else {
      let total = 0;
      selectedRR.quotation.details.forEach((QD) => {
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

  const calcTempTotal = () => {
    if (selectedRR === null) {
      return 0;
    } else {
      let total = 0;
      selectedRR.quotation.details.forEach((QD) => {
        total = Number(total) + Number(QD.quantity) * Number(QD.unitPrice);
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
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <div>
            <Modal isOpen={openQuotation} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phi???u b??o gi?? d???ch v???
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <ColoredLine color="grey" />
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

                    {selectedRR !== null ? (
                      <tbody>
                        {selectedRR.quotation.details.map((QD, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{listAccessoryDB[QD.accessoryId]}</td>
                            <td>{QD.quantity}</td>
                            <td>{QD.unitPrice} VN??</td>
                            <td>
                              {QD.issueName != null ? QD.issueName : "Kh??ng c??"}
                            </td>
                            <td>
                              {QD.laborCost != null ? QD.laborCost : 0} VN??
                            </td>
                            <td>
                              {QD.laborCost != null
                                ? Number(QD.quantity) * Number(QD.unitPrice) +
                                  Number(QD.laborCost)
                                : Number(QD.quantity) * Number(QD.unitPrice)}
                              VN??
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
                        <h3>T???ng c???ng</h3>
                      </FormGroup>
                    </Col>
                    <Row>
                      <Col md="auto" style={{ marginRight: 25 }}>
                        <h3 className="title">
                          {calcTempQuotationTotal()} VN??
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
                  H???y
                </Button>
                <Button
                  onClick={handleOpenEF}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Xu???t ph??? t??ng
                </Button>
              </ModalFooter>
            </Modal>
            
            <Modal isOpen={openExportForm} size="lg">
              <ModalHeader style={{ margin: 10, justifyContent: "center" }}>
                <h3 className="title">Phi???u xu???t ph??? t??ng</h3>
              </ModalHeader>
              <ModalBody style={{ margin: 10 }}>
                <Row>
                  <Col className="pr-md-1" style={{ margin: 5 }}>
                    <FormGroup>
                      <label>Ng?????i ti???p nh???n ph??? t??ng</label>
                      <Input
                        type="text"
                        onChange={(e) => {
                          setReceiver(e.target.value);
                        }}
                        value={receiver ? receiver : ""}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Alert color="danger" isOpen={emptyReceiverAlert}>
                  Vui l??ng nh???p ng?????i ti???p nh???n!
                </Alert>
                <Row>
                  <ColoredLine color="grey" />
                  <Card>
                    <CardTitle tag="h4">Danh s??ch ph??? t??ng</CardTitle>
                    <ColoredLine color="grey" />
                    <table class="table">
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Ph??? t??ng</th>
                          <th>S??? l?????ng</th>
                          <th>Gi?? b??n</th>
                          <th>Th??nh ti???n</th>
                        </tr>
                      </thead>
                      {selectedRR !== null ? (
                        <tbody>
                          {selectedRR.quotation.details.map((QD, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{listAccessoryDB[QD.accessoryId]}</td>
                              <td>{QD.quantity}</td>
                              <td>{QD.unitPrice} VN??</td>
                              <td>
                                {Number(QD.quantity) * Number(QD.unitPrice)}
                                VN??
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody></tbody>
                      )}
                    </table>
                  </Card>
                </Row>
                <ColoredLine color="gray" />
                <Row>
                  <Col>
                    <h4 className="title">T???ng c???ng</h4>
                  </Col>
                  <Col md="auto">
                    <h4 className="title">{calcTempTotal()} VN??</h4>
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
                  H???y
                </Button>
                <Button
                  onClick={ExportAccessoriesIssue}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Xu???t
                </Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                      <CardTitle tag="h4">Danh s??ch b??o gi??</CardTitle>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input
                          type="select"
                          defaultValue={"1"}
                          onChange={(e) => getSearchField(e)}
                        >
                          <option value="1">Xe</option>
                          <option value="2">Ng??y t???o</option>
                          <option value="3">T???ng chi ph??</option>
                        </Input>
                      </Col>
                      <Col md="3" hidden={isDateSearch}>
                        <Input
                          value={searchTerm}
                          type="text"
                          placeholder="T??m ki???m b??o gi??"
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
                        Kh??ng t??m th???y b??o gi?? ph?? h???p
                      </p>
                    ) : (
                      <table className="table table-borderless table-hover">
                        <thead>
                          <tr>
                            <th width={50}>ID</th>
                            <th>Ng??y t???o</th>
                            <th>Xe</th>
                            <th>T???ng chi ph??</th>
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
