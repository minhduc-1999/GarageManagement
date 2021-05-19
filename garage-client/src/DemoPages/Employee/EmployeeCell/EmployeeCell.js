import React from 'react';
import { Table } from 'reactstrap';
import { DialogUtils } from 'react-open-dialog';

export default class EmployeeCell extends React.Component {
  openDialog() {
    DialogUtils.openConfirmDialog({
      title: 'Dilog Title',
      message:
        'Elit amet esse minim elit pariatur voluptate dolor non et. Nulla ad do amet amet mollit duis voluptate magna. Nisi in non cillum amet magna consequat occaecat adipisicing. Ex consequat qui mollit eu exercitation et do adipisicing reprehenderit. Laborum sint eu sit sit ea anim Lorem id ut qui consectetur proident eiusmod laborum. Ipsum aliquip duis fugiat veniam nulla ut.'
      })
  }
  render() {
    return (
      <Table hover className="mb-0">
        <thead>
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
          <tr onClick={this.openDialog}>
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
          <tr onClick={this.openDialog}>
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
          <tr onClick={this.openDialog}>
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
    );
  }
}
