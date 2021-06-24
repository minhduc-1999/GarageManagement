import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "contexts/AuthProvider";
import classNames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
  const [accessoryIssues, setaccessoryIssues] = useState(null);
  const [accessoryIssuesDetails, setAIDetails] = useState(null);

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
    async function fetchAccessoryIssuesData() {
      axios
        .get(process.env.REACT_APP_BASE_URL +"api/accessory-issues/", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setaccessoryIssues(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAccessoryReceiptsData();
    fetchAccessoryIssuesData();
  },[]);
  
  function getAccessoryIssueDetailsData(accessoryIssuesId) {
    let loginToken = localStorage.getItem("LoginToken");
  axios
    .get( process.env.REACT_APP_BASE_URL +"api/accessory-issues/details/" + accessoryIssuesId, {
      headers: {
        Authorization: "Bearer " + loginToken,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      console.log(data);
      setAIDetails(data);
    })
    .catch((error) => console.log(error));
}
function getAccessoryReceiptsDetailsData(accessoryReceiptsId) {
  let loginToken = localStorage.getItem("LoginToken");
axios
  .get( process.env.REACT_APP_BASE_URL +"api/accessory-receipts/details/" + accessoryReceiptsId, {
    headers: {
      Authorization: "Bearer " + loginToken,
    },
  })
  .then((response) => {
    return response.data;
  })
  .then((data) => {
    console.log(data);
    setARDetails(data);
  })
  .catch((error) => console.log(error));
}
  return (
    <>
      <div className="content">
        {userAcc.role === "receptionist" ?
        <p>Bạn không có quyền truy cập</p> :
        <div className="content">
        {( accessoryReceipts===null || accessoryIssues===null) ? (
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
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>STT</th>
                      <th>Nhân viên nhập kho</th>
                      <th>Tổng chi phí (VNĐ)</th>
                      <th>Thời gian nhập</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accessoryReceipts.map((data, index) => (
                            <tr key={index}
                            onDoubleClick={() => {getAccessoryReceiptsDetailsData(data.id)}
                          }
                            >
                              <th scope="row">{index + 1}</th>
                              <td>
                                {data.creator.fullName}
                              </td>
                              <td>{data.totalAmount} VNĐ</td>
                              <td>{new Date (data.createdDate).toLocaleString('vi-VI', { timeZone: 'UTC' })}</td>
                            </tr>
                  ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card>
            {( accessoryReceiptsDetails===null) ? (
          <p>Chọn một phiếu để xem thông tin chi tiết</p>
        ) : ( <div>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết phiếu nhập phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>STT</th>
                      <th>Tên phụ tùng</th>
                      <th>Nhà cung cấp</th>
                      <th>Phân loại</th>
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
                  <td>{data.name}
                </td>
                  <td>
                    {data.providerName}
                  </td>
                  <td>{data.typeName}</td>
                  <td>{data.quantity}</td>
                  <td>{data.unit}</td>
                  <td>{data.unitPrice} VNĐ</td>
                  <td>{data.unitPrice*data.quantity} VNĐ</td>
                </tr>
                );
                })}
                  </tbody>
                </table>
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
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Nhân viên lập</th>
                      <th>Người tiếp nhận</th>
                      <th>Thời gian lập</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accessoryIssues.map((data, index) => (
                            <tr key={index}
                            onDoubleClick={() => {getAccessoryIssueDetailsData(data.id)}
                          }
                            >
                              <th scope="row">{index + 1}</th>
                              <td>
                                {data.creator.fullName}
                              </td>
                              <td>
                                {data.receiver}
                              </td>
                              <td>{new Date (data.createdDate).toLocaleString('vi-VI', { timeZone: 'UTC' })}</td>
                            </tr>
                          ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col md="7">
            <Card>
            {( accessoryIssuesDetails===null) ? (
          <p>Chọn một phiếu để xem thông tin chi tiết</p>
        ) : ( <div>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết phiếu xuất phụ tùng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tên phụ tùng</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                    </tr>
                  </thead>
                  <tbody>
                  {accessoryIssuesDetails.map((data, index) => { 
                  return (
                  <tr key={index} >
                  <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.quantity}</td>
                <td>{data.unit}</td>
                </tr>
                
                );
                })}
                  </tbody>
                </table>
              </CardBody>
              </div>
        )}
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
