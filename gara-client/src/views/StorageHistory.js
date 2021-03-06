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
        <p>B???n kh??ng c?? quy???n truy c???p</p> :
        <div className="content">
        {( accessoryReceipts===null || accessoryIssues===null) ? (
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <div className="content"> 
          <Card>
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <CardTitle tag="h3">L???ch s??? nh???p/xu???t kho</CardTitle>
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
                        L???ch s??? nh???p
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
                        L???ch s??? xu???t
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
                <CardTitle tag="h4">Danh s??ch phi???u nh???p ph??? t??ng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>STT</th>
                      <th>Nh??n vi??n nh???p kho</th>
                      <th>T???ng chi ph?? (VN??)</th>
                      <th>Th???i gian nh???p</th>
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
                              <td>{data.totalAmount} VN??</td>
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
          <p>Ch???n m???t phi???u ????? xem th??ng tin chi ti???t</p>
        ) : ( <div>
              <CardHeader>
                <CardTitle tag="h4">Chi ti???t phi???u nh???p ph??? t??ng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>STT</th>
                      <th>T??n ph??? t??ng</th>
                      <th>Nh?? cung c???p</th>
                      <th>Ph??n lo???i</th>
                      <th>S??? l?????ng</th>
                      <th>????n v???</th>
                      <th>????n gi??</th>
                      <th>Th??nh ti???n (VN??)</th>
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
                  <td>{data.unitPrice} VN??</td>
                  <td>{data.unitPrice*data.quantity} VN??</td>
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
                <CardTitle tag="h4">Danh s??ch phi???u xu???t ph??? t??ng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Nh??n vi??n l???p</th>
                      <th>Ng?????i ti???p nh???n</th>
                      <th>Th???i gian l???p</th>
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
          <p>Ch???n m???t phi???u ????? xem th??ng tin chi ti???t</p>
        ) : ( <div>
              <CardHeader>
                <CardTitle tag="h4">Chi ti???t phi???u xu???t ph??? t??ng</CardTitle>
              </CardHeader>
              <CardBody>
                <table class="table">
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>T??n ph??? t??ng</th>
                      <th>S??? l?????ng</th>
                      <th>????n v???</th>
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
