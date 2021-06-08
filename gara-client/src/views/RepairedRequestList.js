import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Form,
  Alert,
} from "reactstrap";

import {
    Tooltip,
    Fab,
} from "@material-ui/core"
const axios = require("axios");

function RepairedRequestList() {

    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [phoneNum, setPhoneNum] = useState(null);
    const [email, setEmail] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);

    const AddNewCustomer = () => {
        if (!name || !address || !phoneNum || !email) {
            setEmptyFieldAlert(true);
            return;
        }
        let loginToken = localStorage.getItem("LoginToken");
        let createCustomer = new FormData();
        createCustomer.append("Name", name);
        createCustomer.append("Address", address);
        createCustomer.append("PhoneNumber", phoneNum);
        createCustomer.append("Email", email);
        axios.post("http://localhost:5000/api/customers", createCustomer, {
            headers: {
                Authorization: "Bearer " + loginToken,
            },
        }).then(response => {
            console.log("thanh cong");
            setOpenNewCustomer(!openNewCustomer);
        }).catch(error => {
            console.log(error);
            setAlertVisible(true);
        })
    }

    const onDismiss = () => setAlertVisible(!alertVisible);
    const onDismissEmpty = () => setEmptyFieldAlert(!emptyFieldAlert);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1
            }}
        />
    );

    const [openInvoice, setOpenInvoice] = React.useState(false);
  
    const handleClickOpenInvoice = () => {
        setOpenInvoice(true);
    };
  
    const handleCloseInvoice = () => {
        setOpenInvoice(false);
    };


    const [open, setOpenModal] = React.useState(false);
  
    const handleClickOpen = () => {
        setOpenModal(true);
    };
  
    const handleClose = () => {
        setOpenModal(false);
    };

    const [openNewCustomer, setOpenNewCustomer] = React.useState(false);
  
    const handleClickOpenNewCustomer = () => {
        setOpenNewCustomer(true);
    };
  
    const handleCloseNewCustomer = () => {
        setOpenNewCustomer(false);
        setAlertVisible(false);
        setEmptyFieldAlert(false);
    };

    return (
            <>
            <div className="content">
                <Modal isOpen={openInvoice} size="lg">
                    <ModalHeader style={{margin:25, justifyContent:"center"}}>
                        <p style={{fontSize: 25}} className="title">Hóa đơn</p>
                    </ModalHeader>
                    <ModalBody>
                        <ColoredLine color="gray"/>
                        <Row>
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col>
                                            <CardTitle tag="h4">Danh sách sử dụng phụ tùng</CardTitle>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>ID</th>
                                        <th>Phụ tùng</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>abc</td>
                                        <td>50</td>
                                        <td>10000 VNĐ</td>
                                        <td>5000000 VNĐ</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>xyz</td>
                                        <td>50</td>
                                        <td>10000 VNĐ</td>
                                        <td>5000000 VNĐ</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>binh</td>
                                        <td>50</td>
                                        <td>10000 VNĐ</td>
                                        <td>5000000 VNĐ</td>
                                    </tr>
                                    </tbody>
                                </Table>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row>
                            <Col>
                                <h4 className="title">Phí sửa chữa</h4>
                            </Col>
                            <Col md="auto">
                                <h5 className="title">100000 VNĐ</h5>
                            </Col>
                        </Row>
                        <ColoredLine color="gray"/>
                        <Row>
                            <Col>
                                <h4 className="title">Thành tiền</h4>
                            </Col>
                            <Col md="auto">
                                <h4 className="title">1000000 VNĐ</h4>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter style={{margin:25, justifyContent:"flex-end"}}>
                        <Button onClick={handleCloseInvoice} className="btn-fill" color="primary" type="submit" style={{marginRight:25}}>
                        In hóa đơn
                        </Button>
                        <Button onClick={handleCloseInvoice} className="btn-fill" color="primary" type="submit">
                        OK
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={open} size="sm">
                    <ModalHeader >
                        <p style={{fontSize: 22}} className="title">Phiếu tiếp nhận xe</p>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                        <Row>
                            <Col className="pr-md-1">
                            <FormGroup>
                                <label>Khách hàng</label>
                                <Input name="select" id="exampleSelect" type="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            </Col>
                            <Col md="auto" style={{alignItems: "flex-end", display: "flex"}}>
                                <Tooltip title="Thêm khách hàng mới">
                                    <Fab onClick={handleClickOpenNewCustomer} size="small" style={{marginBottom: 10}}>
                                        <i className="tim-icons icon-simple-add"></i>
                                    </Fab>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-md-1">
                            <FormGroup>
                                <label>Hiệu xe</label>
                                <Input
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            <Col className="pl-md-1">
                            <FormGroup>
                                <label>Biển số</label>
                                <Input
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FormGroup>
                                <label>Nội dung sửa chữa</label>
                                <Input
                                cols="80"
                                rows="4"
                                type="textarea"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{margin:25, justifyContent:"flex-end"}}>
                        <Button onClick={handleClose} className="btn-fill" color="primary" type="submit" style={{marginRight:25}}>
                        Hủy
                        </Button>
                        <Button onClick={handleClickOpenInvoice} className="btn-fill" color="primary" type="submit" style={{marginRight:25}}>
                        Hóa đơn
                        </Button>
                        <Button onClick={handleClose} className="btn-fill" color="primary" type="submit">
                        Thêm
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openNewCustomer} size="sm">
                    <ModalHeader >
                        <p style={{fontSize: 22}} className="title">Thông tin khách hàng mới</p>
                    </ModalHeader>
                    <ModalBody>
                        <Form style={{marginLeft: 10, marginRight: 10}}>
                            <FormGroup>
                                <label>Họ và Tên</label>
                                <Input
                                placeholder="Họ và tên"
                                type="text"
                                onChange={(e) => {setName(e.target.value); setEmptyFieldAlert(false);}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="exampleInputEmail1">
                                Địa chỉ Email
                                </label>
                                <Input placeholder="Email" type="email"
                                onChange={(e) => {setEmail(e.target.value); setEmptyFieldAlert(false);}} />
                            </FormGroup>
                            <FormGroup>
                                <label>Số điện thoại</label>
                                <Input placeholder="Số điện thoại"
                                type="text"
                                onChange={(e) => {setPhoneNum(e.target.value); setEmptyFieldAlert(false);}} />
                            </FormGroup>
                            <FormGroup>
                                <label>Địa chỉ</label>
                                <Input placeholder="Địa chỉ"
                                type="text"
                                onChange={(e) => {setAddress(e.target.value); setEmptyFieldAlert(false);}} />
                            </FormGroup>
                        </Form>
                        <Alert
                            className="alert-error"
                            color="warning"
                            isOpen={alertVisible}
                            toggle={onDismiss}
                        >
                            Tên tài khoản đã được sử dụng.
                        </Alert>
                        <Alert
                        style={{width: 330}}
                            className="alert-error"
                            color="warning"
                            isOpen={emptyFieldAlert}
                            toggle={onDismissEmpty}
                        >
                            Thiếu thông tin khách hàng.
                        </Alert>
                    </ModalBody>
                    <ModalFooter style={{margin:25, justifyContent:"flex-end"}}>
                        <Button onClick={AddNewCustomer} className="btn-fill" color="primary" type="submit" style={{marginRight:25}}>
                        Thêm
                        </Button>
                        <Button onClick={handleCloseNewCustomer} className="btn-fill" color="primary" type="submit">
                        Hủy
                        </Button>
                    </ModalFooter>
                </Modal>
                <Row>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col>
                                    <CardTitle tag="h4">Danh sách phiếu tiếp nhận xe</CardTitle>
                                </Col>
                                <Col md="auto">
                                    <Button className="btn-fill" color="primary" type="submit" onClick={handleClickOpen}>
                                        Thêm
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                        <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                            <tr>
                                <th>ID</th>
                                <th>Ngày tiếp nhận</th>
                                <th>Chủ xe</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Hiệu xe</th>
                                <th>Biển số</th>
                                <th>Tình trạng</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>22/04/2021</td>
                                <td>Nguyen Van A</td>
                                <td>TP.HCM</td>
                                <td>0123456789</td>
                                <td>BMW-350i</td>
                                <td>92A-12345</td>
                                <td><font color="red">Chưa thanh toán</font></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>22/04/2021</td>
                                <td>Nguyen Van B</td>
                                <td>TP.HCM</td>
                                <td>0123456789</td>
                                <td>Mazda 3</td>
                                <td>92A-54321</td>
                                <td><font color="green">Đã thanh toán</font></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>22/04/2021</td>
                                <td>Nguyen Van C</td>
                                <td>TP.HCM</td>
                                <td>0123456789</td>
                                <td>Lexus 570</td>
                                <td>92A-12346</td>
                                <td><font color="green">Đã thanh toán</font></td>
                            </tr>
                            </tbody>
                        </Table>
                        </CardBody>
                    </Card>
                </Row>
            </div>
        </>
    );
}

export default RepairedRequestList;
