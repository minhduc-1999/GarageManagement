import React, { useContext, useState } from "react";
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
} from "reactstrap";
const axios = require("axios");

function Report() {
  const {userAcc} = useContext(AuthContext);
  const [reportOption, setReportOption] = useState("revenue");
  const [reportType, setReportType] = useState("monthly");
  const [dataChart, setDataChart] = useState(null);
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth());
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  // useEffect(() => {
  //   let loginToken = localStorage.getItem("LoginToken");
  //   axios.get(process.env.REACT_APP_BASE_URL + "api/report/revenue", {
  //     params: {
  //       option: reportType,
  //       year: selectYear,
  //       month: selectMonth,
  //     },
  //     headers: {
  //       Authorization: "Bearer " + loginToken,
  //     }
  //   }).then()
  //   // eslint-disable-next-line
  // }, [])

  const showReport = () => {
    if (((!selectMonth || !selectYear) && reportType === "monthly")
      || (!selectYear && reportType === "annual") ) {
      return;
    } else {
      let loginToken = localStorage.getItem("LoginToken");
      axios.get(process.env.REACT_APP_BASE_URL + "api/report/" + reportOption, {
        params: {
          option: reportType,
          year: selectYear,
          ...(reportType === "monthly" ? { month: selectMonth } : {})
        },
        headers: {
          Authorization: "Bearer " + loginToken,
        }
      }).then(res => {
        setDataChart(getRes(res.data));
      }).catch(error => console.log(error))
    }
  }

  const getRes = (data) => {

    const lab = data.map(item => {return (reportType === "monthly" ? "Ngày " : "Tháng ") + item.label});

    const tooltipLab = (reportOption === "revenue" ? "Doanh thu" : "Khách hàng mới");

    return {
      labels: lab,
      datasets: [{
        label: tooltipLab,
        data: data.map(item => item.value),
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
      },]
    }
  }

  return (
    <>
      <div className="content">
        {userAcc.role !== "admin" && userAcc.role !== "manager" ?
        <p>Bạn không có quyền truy cập</p> :
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                        <h5 className="card-category">Doanh thu và khách hàng mới</h5>
                        <CardTitle tag="h2">Biểu đồ</CardTitle>
                        <h4>Báo cáo theo:</h4>
                        <Row>
                          <Col sm="2">
                            <Input 
                              onChange={e => setReportType(e.target.value)}
                              type="select"
                              defaultValue={"DEFAUTL"} >
                              <option value="DEFAULT" disabled>Chọn loại báo cáo</option>
                              <option value="monthly">Tháng</option>
                              <option value="annual">Năm</option>
                            </Input>
                          </Col>
                          <Col sm="2" hidden={reportType === "annual"}>
                            <Input 
                              onChange={e => setSelectMonth(e.target.value)}
                              type="select"
                              defaultValue="DEFAUTL" >
                              <option value="DEFAULT" disabled>Chọn tháng</option>
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
                            <h4 style={{marginTop: 5}}>
                              Năm
                            </h4>
                          </Col> 
                          <Col sm="2">
                            <Input 
                              value={selectYear}
                              onChange={e => setSelectYear(e.target.value)}
                              type="number"
                              defaultValue={new Date().getFullYear()} />
                          </Col> 
                          <Col sm="3">
                            <Button 
                              onClick={showReport}
                              color="primary"
                              style={{marginTop: 0}}>
                              Xem
                            </Button>
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
                            active: reportOption === "revenue",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setReportOption("revenue")}
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
                          onClick={() => setReportOption("new-customer")}
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
                    <Line
                      redraw
                      data={dataChart}
                      options={optionsChart}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Báo cáo phụ tùng</CardTitle>
                </CardHeader>
                <CardBody>
                <table className="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>ID</th>
                      <th>Tên phụ tùng</th>
                      <th>Thương hiệu</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Loại</th>
                      <th>Nhà cung cấp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-center badge-danger" scope="row">1</th>
                      <td>Nắp ca bô</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">2</th>
                      <td>Nắp ca bô</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-focus" scope="row">3</th>
                      <td>Nắp ca bô</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                  </tbody>
                </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        }
      </div>
    </>
  );
};

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