import React from 'react';
import { Table } from 'reactstrap';

export default class CustomerRequest extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mô tả</th>
            <th>Ngày yêu cầu</th>
            <th>Biển số xe</th>
            <th>Loại xe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Xe quá cũ</td>
            <td>01/01/2000</td>
            <td>GPMN-1975</td>
            <td>Xe xích lô</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Xe đạp hết xăng</td>
            <td>01/01/2000</td>
            <td>TDBP-1954</td>
            <td>Xe tăng</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Xe tăng thủng lốp</td>
            <td>01/01/2000</td>
            <td>CMT8-1945</td>
            <td>Xe đạp</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
