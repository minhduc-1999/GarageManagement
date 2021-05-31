import React from "react";
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
} from "reactstrap";

import {
    Tooltip,
    Fab,
} from "@material-ui/core"

function RepairedRequestList() {
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
    };

    return (
            <>
            <div className="content">
                <Modal isOpen={open} size="sm">
                    <ModalHeader >
                        <h4 className="title">Phiếu tiếp nhận xe</h4>
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
                        <Button onClick={handleClose} className="btn-fill" color="primary" type="submit">
                        Thêm
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={openNewCustomer} size="sm">
                    <ModalHeader >
                        <h4 className="title">Thông tin khách hàng mới</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                        <Row>
                            <Col className="pr-md-1">
                            <FormGroup>
                                <label>Họ và Tên</label>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <Input
                                        placeholder="Họ"
                                        type="text"
                                        />
                                    </Col>
                                    <Col className="pr-md-1" md="8">
                                        <Input
                                        placeholder="Tên"
                                        type="text"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            </Col>
                            {/* <Col md="auto" style={{alignItems: "flex-end", display: "flex"}}>
                                    <Button color="link" type="button" style={{marginBottom: 10}}>
                                        <i className="tim-icons icon-simple-add"></i>
                                    </Button>
                            </Col>
                            <Col className="px-md-1" md="3">
                            <FormGroup>
                                <label>Username</label>
                                <Input
                                defaultValue="michael23"
                                placeholder="Username"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            <Col className="pl-md-1" md="4">
                            <FormGroup>
                                <label htmlFor="exampleInputEmail1">
                                Email address
                                </label>
                                <Input placeholder="mike@email.com" type="email" />
                            </FormGroup>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col className="pr-md-1">
                            <FormGroup>
                                <label>Số điện thoại</label>
                                <Input
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            {/* <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <label>Last Name</label>
                                <Input
                                defaultValue="Andrew"
                                placeholder="Last Name"
                                type="text"
                                />
                            </FormGroup>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col className="pr-md-1">
                            <FormGroup>
                                <label>Địa chỉ</label>
                                <Input
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            {/* <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <label>Last Name</label>
                                <Input
                                defaultValue="Andrew"
                                placeholder="Last Name"
                                type="text"
                                />
                            </FormGroup>
                            </Col> */}
                        </Row>
                        <Row>
                            <Col className="pr-md-1">
                                <FormGroup>
                                    <label htmlFor="exampleInputEmail1">
                                    Địa chỉ Email
                                    </label>
                                    <Input type="email" />
                                </FormGroup>
                            </Col>
                        </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter style={{margin:25, justifyContent:"flex-end"}}>
                        <Button onClick={handleCloseNewCustomer} className="btn-fill" color="primary" type="submit" style={{marginRight:25}}>
                        Hủy
                        </Button>
                        <Button onClick={handleCloseNewCustomer} className="btn-fill" color="primary" type="submit">
                        Thêm
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
