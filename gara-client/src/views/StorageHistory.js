import React, { useContext, useState, useEffect } from "react";
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
const axios = require("axios");



function StorageHistory() {
  const {userAcc} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("1");
  const [accessoryReceipts, setAccessoryReceipts] = useState(null);
  const [accessoryReceiptsDetails, setARDetails] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [accessoryName, setAccessoryName] = useState(null);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchAccessoryReceiptsData() {
      axios
        .get(process.env.REACT_APP_BASE_URL +"api/accessory-receipts/", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setAccessoryReceipts(data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchAccessoryData() {
      axios
        .get( process.env.REACT_APP_BASE_URL +"api/accessories/", {
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
    fetchAccessoryReceiptsData();
    fetchAccessoryData();
  });

  return (
    <>
      <div className="content">
        {userAcc.role === "receptionist" ?
        <p>Bạn không có quyền truy cập</p> :
        <div className="content">
        {( accessoryReceipts===null || accessories===null) ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
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
                      <th>STT</th>
                      <th>Thời gian nhập</th>
                      <th>Nhân viên nhập kho</th>
                      <th>Chi phí (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accessoryReceipts.map((data, index) => (
                            <tr key={index}
                            onClick={() => {setARDetails(data.details)}
                          
                          }
                            >
                              <th scope="row">{index + 1}</th>
                              <td>{data.createdDate}</td>
                              <td>
                                {data.creator.fullName}
                              </td>
                              <td>{data.totalAmount}</td>
                            </tr>
                          ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card>
            {( accessoryReceiptsDetails===null) ? (
          <p>Chọn một phiếu để xem thông tin chi tiết ...</p>
        ) : ( <div>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết phiếu nhập phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>STT</th>
                      <th>Tên phụ tùng</th>
                      <th>Nhà cung cấp</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accessoryReceiptsDetails.map((data, index) => { 
                    return (
                  <tr key={index} >
                  <th scope="row">{index + 1}</th>
                  <td>{ accessories.find((accessory) => accessory.id === data.accessoryId).name?
                  accessories.find((accessory) => accessory.id === data.accessoryId).name : "-"}
                </td>
                  <td>
                    {accessories.find((accessory) => accessory.id === data.accessoryId).provider.name?
                  accessories.find((accessory) => accessory.id === data.accessoryId).provider.name : "-"}
                  </td>
                  <td>{data.quantity}</td>
                  <td>{data.unit}</td>
                  <td>{data.unitPrice}</td>
                  <td>{data.unitPrice*data.quantity}</td>
                </tr>
                );
                })}
                  </tbody>
                </Table>
              </CardBody>
              </div>
        )}
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
          )}
        </div>
          }
      </div>
    </>
  );
}

export default StorageHistory;
