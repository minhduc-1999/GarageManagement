import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Quotations() {
    return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row style={{ margin: 0, justifyContent: "space-between" }}>
                  <CardTitle tag="h4">Danh sách báo giá</CardTitle>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>
                        ID
                      </th>
                      <th>Tổng chi phí</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <th className="text-center" scope="row">
                            1
                        </th>
                        <td>1000000 VNĐ</td>
                        <td><font color="green">Đã xác nhận</font></td>
                    </tr>
                    <tr>
                        <th className="text-center" scope="row">
                            2
                        </th>
                        <td>1000000 VNĐ</td>
                        <td><font color="green">Đã xác nhận</font></td>
                    </tr>
                    <tr>
                        <th className="text-center" scope="row">
                            3
                        </th>
                        <td>1000000 VNĐ</td>
                        <td><font color="red">Chưa xác nhận</font></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Quotations;