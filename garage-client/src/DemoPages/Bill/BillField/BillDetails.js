import React from 'react';
import { Table } from 'reactstrap';

export default class BillDetails extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
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
    );
  }
}
