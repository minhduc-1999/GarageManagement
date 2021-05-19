import React from 'react';
import { Table } from 'reactstrap';

export default class CustomerList extends React.Component {
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Địa chỉ</th>
            <th>Email</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Nguyen Van A</td>
            <td>TP.HCM</td>
            <td>abc@gmail.com</td>
            <td>0123182687</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Pham Van B</td>
            <td>TP.HCM</td>
            <td>abc@gmail.com</td>
            <td>0123182687</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Le Van C</td>
            <td>TP.HCM</td>
            <td>abc@gmail.com</td>
            <td>0123182687</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
