import React from 'react';
import { Table } from 'reactstrap';

export default class BillList extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
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
    );
  }
}
