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

function Bill() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="7">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Danh sách hóa đơn</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tên khách hàng</th>
                      <th>Mã yêu cầu sửa chữa</th>
                      <th>Ngày thanh toán</th>
                      <th>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Nguyen Van A</td>
                      <td>YC00001</td>
                      <td>12/06/2020</td>
                      <td>20.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Pham Van B</td>
                      <td>YC00002</td>
                      <td>30/04/1945</td>
                      <td>5.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Le Van C</td>
                      <td>YC00003</td>
                      <td>12/08/2019</td>
                      <td>15.000.000</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Chi tiết hóa đơn</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tên chi phí</th>
                      <th>Số lượng</th>
                      <th>Đơn vị</th>
                      <th>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Sơn màu</td>
                      <td>1</td>
                      <td>lần</td>
                      <td>2.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Vỏ xe</td>
                      <td>4</td>
                      <td>cái</td>
                      <td>18.000.000</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Kính chiếu hậu</td>
                      <td>2</td>
                      <td>cái</td>
                      <td>800.000</td>
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

export default Bill;
