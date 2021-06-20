import React, { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthProvider";
import classNames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  ButtonGroup,
  TabContent,
  TabPane,
} from "reactstrap";


function StorageHistory() {
  const {userAcc} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
      <div className="content">
        {userAcc.role === "receptionist" ?
        <p>Bạn không có quyền truy cập</p> :
        <div className="content">
          <Card>
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <CardTitle tag="h3">Lịch sử nhập/xuất kho</CardTitle>
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
                      color="primary"
                      id="0"
                      size="sm"
                      onClick={() => setActiveTab("1")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Lịch sử nhập
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="primary"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: activeTab === "2",
                      })}
                      onClick={() => setActiveTab("2")}
                    >
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Lịch sử xuất
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
          </Card>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
        <Row>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Danh sách phiếu nhập phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Ngày nhập</th>
                      <th>Nhân viên nhập kho</th>
                      <th>Chi phí (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-center badge-focus"  scope="row">1</th>
                      <td>12/06/2020</td>
                      <td>NTN</td>
                      <td>20.000.000</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-focus"  scope="row">2</th>
                      <td>30/04/1945</td>
                      <td>TNT</td>
                      <td>5.000.000</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-danger" scope="row">3</th>
                      <td>12/08/2019</td>
                      <td>NBK</td>
                      <td>16.800.000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết phiếu nhập phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tên phụ tùng</th>
                      <th>Thương hiệu</th>
                      <th>Nhà cung cấp</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Vỏ xe</td>
                      <th>BMW</th>
                      <td>Long Enterprise</td>
                      <td>4</td>
                      <td>cái</td>
                      <td>4.000.000</td>
                      <td>16.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Kính chiếu hậu</td>
                      <th>Ford</th>
                      <td>Long Enterprise</td>
                      <td>2</td>
                      <td>cặp</td>
                      <td>400.000</td>
                      <td>800.000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
            </TabPane>
            <TabPane tabId="2">
            <Row>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Danh sách phiếu xuất phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Mã hóa đơn</th>
                      <th>Nhân viên lập</th>
                      <th>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-center badge-danger" scope="row">1</th>
                      <td>HD0001</td>
                      <td>TBinh</td>
                      <td>4.469.000</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-focus" scope="row">2</th>
                      <td>HD1945</td>
                      <td>TLung</td>
                      <td>5.000.000</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-focus" scope="row">3</th>
                      <td>HD1080</td>
                      <td>TLinh</td>
                      <td>15.000.000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết phiếu xuất phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tên phụ tùng</th>
                      <th>Thương hiệu</th>
                      <th>Giá bán</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Vỏ xe</td>
                      <th>BMW</th>
                      <td>4.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Kính chiếu hậu</td>
                      <th>Ford</th>
                      <td>400.000</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Sơn thùng</td>
                      <th>MTP</th>
                      <td>69.000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
            </TabPane>
          </TabContent>
          </div>
          }
      </div>
    </>
  );
}

export default StorageHistory;
