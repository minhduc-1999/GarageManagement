import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "contexts/AuthProvider";
import classNames from "classnames";
import { Line } from "react-chartjs-2";
import "../components/CustomDesign/InputNumber.css";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
  TabPane,
  TabContent,
} from "reactstrap";
const axios = require("axios");

function Report() {
  const { userAcc } = useContext(AuthContext);
  const [reportOption, setReportOption] = useState("revenue");
  const [reportType, setReportType] = useState("monthly");
  const [dataChart, setDataChart] = useState(null);
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth());
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState("1");

  const [receiptsRPData, setReceiptsRPData] = useState([]);
  const [issuesRPData, setIssuesRPData] = useState([]);
  const [acessoryReportType, setAReportType] = useState("monthly");
  const [selectAMonth, setSelectAMonth] = useState(new Date().getMonth());
  const [selectAYear, setSelectAYear] = useState(new Date().getFullYear());

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchAccessoryReceiptsReportData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/report/accessory-receipt/", {
          params: {
            option: acessoryReportType,
            year: selectAYear,
            ...(acessoryReportType === "monthly"
              ? { month: selectAMonth }
              : {}),
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setReceiptsRPData(data);
        })
        .catch((error) => console.log(error));
      // eslint-disable-next-line
    }

    function fetchAccessoryIssuesReportData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/report/accessory-issue/", {
          params: {
            option: acessoryReportType,
            year: selectAYear,
            ...(acessoryReportType === "monthly"
              ? { month: selectAMonth }
              : {}),
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setIssuesRPData(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAccessoryReceiptsReportData();
    fetchAccessoryIssuesReportData();
  }, [acessoryReportType, selectAYear, selectAMonth]);

  useEffect(() => {
    const showReport = () => {
      if (
        ((!selectMonth || !selectYear) && reportType === "monthly") ||
        (!selectYear && reportType === "annual")
      ) {
        return;
      } else {
        let loginToken = localStorage.getItem("LoginToken");
        axios
          .get(process.env.REACT_APP_BASE_URL + "api/report/" + reportOption, {
            params: {
              option: reportType,
              year: selectYear,
              ...(reportType === "monthly" ? { month: selectMonth } : {}),
            },
            headers: {
              Authorization: "Bearer " + loginToken,
            },
          })
          .then((res) => {
            if (res.data.length < 1) {
              setDataChart(null);
            } else {
              setDataChart(
                getRes(
                  res.data.sort(
                    (item1, item2) => Number(item1.label) - Number(item2.label)
                  )
                )
              );
            }
          })
          .catch((error) => console.log(error));
      }
    };
    showReport();
    // eslint-disable-next-line
  }, [reportOption, reportType, selectMonth, selectYear]);

  const getRes = (data) => {
    const lab = data.map((item) => {
      return (reportType === "monthly" ? "Ngày " : "Tháng ") + item.label;
    });

    const tooltipLab =
      reportOption === "revenue" ? "Doanh thu" : "Khách hàng mới";

    return {
      labels: lab,
      datasets: [
        {
          label: tooltipLab,
          data: data.map((item) => item.value),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
        },
      ],
    };
  };

  return (
    <>
      <div className="content">
        {userAcc.role !== "admin" && userAcc.role !== "manager" ? (
          <p>Bạn không có quyền truy cập</p>
        ) : (
          <div className="content">
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">
                          Doanh thu và khách hàng mới
                        </h5>
                        <CardTitle tag="h2">Biểu đồ</CardTitle>
                        <h4>Báo cáo theo:</h4>
                        <Row>
                          <Col sm="2">
                            <Input
                              onChange={(e) => setReportType(e.target.value)}
                              type="select"
                              defaultValue={"DEFAUTL"}
                            >
                              <option value="DEFAULT" disabled>
                                Chọn loại báo cáo
                              </option>
                              <option value="monthly">Tháng</option>
                              <option value="annual">Năm</option>
                            </Input>
                          </Col>
                          <Col sm="2" hidden={reportType === "annual"}>
                            <Input
                              onChange={(e) => setSelectMonth(e.target.value)}
                              type="select"
                              defaultValue="DEFAUTL"
                            >
                              <option value="DEFAULT" disabled>
                                Chọn tháng
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </Input>
                          </Col>
                          <Col sm="1.5" hidden={reportType === "annual"}>
                            <h4 style={{ marginTop: 5 }}>Năm</h4>
                          </Col>
                          <Col sm="2">
                            <Input
                              value={selectYear}
                              onChange={(e) => setSelectYear(e.target.value)}
                              type="number"
                              defaultValue={new Date().getFullYear()}
                            />
                          </Col>
                          {/* <Col sm="3">
                            <Button 
                              onClick={showReport}
                              color="primary"
                              style={{marginTop: 0}}>
                              Xem
                            </Button>
                          </Col> */}
                        </Row>
                      </Col>
                      <Col sm="6">
                        <ButtonGroup
                          className="btn-group-toggle float-right"
                          data-toggle="buttons"
                        >
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {
                              active: reportOption === "revenue",
                            })}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => {
                              setReportOption("revenue");
                            }}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Doanh thu
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-single-02" />
                            </span>
                          </Button>
                          <Button
                            color="info"
                            id="1"
                            size="sm"
                            tag="label"
                            className={classNames("btn-simple", {
                              active: reportOption === "new-customer",
                            })}
                            onClick={() => {
                              setReportOption("new-customer");
                            }}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Khách hàng mới
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-gift-2" />
                            </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      {!dataChart ? (
                        <p style={{ marginLeft: 10, fontSize: 20 }}>
                          Không có dữ liệu
                        </p>
                      ) : (
                        <Line redraw data={dataChart} options={optionsChart} />
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">Báo cáo phụ tùng</h5>
                        <h4>Báo cáo theo:</h4>
                        <Row>
                          <Col sm="2">
                            <Input
                              onChange={(e) => setAReportType(e.target.value)}
                              type="select"
                              defaultValue={"DEFAUTL"}
                            >
                              <option value="DEFAULT" disabled>
                                Chọn loại báo cáo
                              </option>
                              <option value="monthly">Tháng</option>
                              <option value="annual">Năm</option>
                            </Input>
                          </Col>
                          <Col sm="2" hidden={acessoryReportType === "annual"}>
                            <Input
                              onChange={(e) => setSelectAMonth(e.target.value)}
                              type="select"
                              defaultValue="DEFAUTL"
                            >
                              <option value="DEFAULT" disabled>
                                Chọn tháng
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                            </Input>
                          </Col>
                          <Col
                            sm="1.5"
                            hidden={acessoryReportType === "annual"}
                          >
                            <h4 style={{ marginTop: 5 }}>Năm</h4>
                          </Col>
                          <Col sm="2">
                            <Input
                              value={selectAYear}
                              onChange={(e) => setSelectAYear(e.target.value)}
                              type="number"
                              defaultValue={new Date().getFullYear()}
                            />
                          </Col>
                        </Row>
                    </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: activeTab === "1",
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => setActiveTab("1")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Báo cáo nhập
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: activeTab === "2",
                      })}
                      onClick={() => setActiveTab("2")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Báo cáo xuất
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
                <CardBody>
                <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <table className="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>ID</th>
                      <th>Ngày nhập</th>
                      <th>Tên phụ tùng</th>
                      <th>Nhà cung cấp</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Giá nhập</th>
                    </tr>
                  </thead>
                  <tbody>
                  {receiptsRPData.map((data, index) => (
                            <tr key={index}
                            >
                              <th scope="row">{index + 1}</th>
                              <td>{new Date (data.createdDate).toLocaleDateString('vi-VI', { timeZone: 'UTC' })}</td>
                              <td>
                                {data.name}
                              </td>
                              <td>{data.providerName}</td>
                              <td>{data.quantity}</td>
                              <td>{data.unit}</td>
                              <td>{data.unitPrice} VNĐ</td>
                            </tr>
                  ))}
                  </tbody>
                </table>
            </TabPane>
            <TabPane tabId="2">
            <table className="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>ID</th>
                      <th>Ngày xuất</th>
                      <th>Tên phụ tùng</th>
                      <th>Nhà cung cấp</th>
                      <th>Số lượng</th>
                      <th>Giá bán</th>
                    </tr>
                  </thead>
                  <tbody>
                  {issuesRPData.map((data, index) => (
                            <tr key={index}
                            >
                              <th scope="row">{index + 1}</th>
                              <td>{new Date (data.createdDate).toLocaleDateString('vi-VI', { timeZone: 'UTC' })}</td>
                              <td>
                                {data.name}
                              </td>
                              <td>{data.providerName}</td>
                              <td>{data.quantity}</td>
                              <td>{data.issuePrice} VNĐ</td>
                            </tr>
                          </thead>
                          <tbody>
                            {issuesRPData.map((data, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                  {new Date(
                                    data.createdDate
                                  ).toLocaleDateString("vi-VI", {
                                    timeZone: "UTC",
                                  })}
                                </td>
                                <td>{data.name}</td>
                                <td>{data.providerName}</td>
                                <td>{data.quantity}</td>
                                <td>{data.issuePrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </TabPane>
                    </TabContent>
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

let optionsChart = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

export default Report;
