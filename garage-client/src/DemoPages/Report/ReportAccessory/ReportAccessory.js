import React from 'react';
import { Table } from 'reactstrap';

export default class ReportAccesory extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
          <tr>
            <th className="text-center" width={50}>ID</th>
            <th>Tên phụ tùng</th>
            <th>Thương hiệu</th>
            <th>Số lượng</th>
            <th>Đơn vị</th>
            <th>Loại</th>
            <th>Nhà cung cấp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-center badge-danger" scope="row">1</th>
            <td>Nắp ca bô</td>
            <td>Vinfast</td>
            <td>23412</td>
            <td>cái</td>
            <td>phụ tùng ngoài</td>
            <td>QuocAn Cor.</td>
          </tr>
          <tr>
            <th className="text-center badge-warning" scope="row">2</th>
            <td>Nắp ca bô</td>
            <td>Vinfast</td>
            <td>23412</td>
            <td>cái</td>
            <td>phụ tùng ngoài</td>
            <td>QuocAn Cor.</td>
          </tr>
          <tr>
            <th className="text-center badge-focus" scope="row">3</th>
            <td>Nắp ca bô</td>
            <td>Vinfast</td>
            <td>23412</td>
            <td>cái</td>
            <td>phụ tùng ngoài</td>
            <td>QuocAn Cor.</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
