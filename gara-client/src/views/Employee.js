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

function Employee() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Danh sách nhân viên</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Họ và tên</th>
                      <th>Ngày sinh</th>
                      <th>Địa chỉ</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Tên đăng nhập</th>
                      <th>Chức vụ</th>
                      <th>Ngày tham gia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Nguyen Van A</td>
                      <td>01/01/2000</td>
                      <td>TP.HCM</td>
                      <td>abc@gmail.com</td>
                      <td>0123182687</td>
                      <td>employê1</td>
                      <td>Nhân viên tiếp nhận</td>
                      <td>02/11/2019</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Pham Van B</td>
                      <td>01/01/2000</td>
                      <td>TP.HCM</td>
                      <td>abc@gmail.com</td>
                      <td>0123182687</td>
                      <td>employê1</td>
                      <td>Nhân viên tiếp nhận</td>
                      <td>02/11/2019</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Le Van C</td>
                      <td>01/01/2000</td>
                      <td>TP.HCM</td>
                      <td>abc@gmail.com</td>
                      <td>0123182687</td>
                      <td>employê1</td>
                      <td>Nhân viên tiếp nhận</td>
                      <td>02/11/2019</td>
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

export default Employee;
