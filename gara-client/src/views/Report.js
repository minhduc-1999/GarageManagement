import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthProvider";
import classNames from "classnames";
import { Line } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import { chartExample1 } from "variables/charts.js";

function Report() {
  const {userAcc} = useContext(AuthContext);
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
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
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBgChartData("data1")}
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
                            active: bigChartData === "data2",
                          })}
                          onClick={() => setBgChartData("data2")}
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
                      data={chartExample1[bigChartData]}
                      options={chartExample1.options}
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
                <Table hover className="mb-0">
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
                </Table>
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

export default Report;