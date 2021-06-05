import React from "react";
import classNames from "classnames";
import { Line } from "react-chartjs-2";

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
import { Tooltip, Fab } from "@material-ui/core";

function Accessories() {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );
  const [openExportForm, setOpenEFModal] = React.useState(false);

  const handleClickOpenEF = () => {
    setOpenEFModal(true);
  };

  const handleCloseEF = () => {
    setOpenEFModal(false);
  };
  const [openImportForm, setOpenIFModal] = React.useState(false);

  const handleClickOpenIF = () => {
    setOpenIFModal(true);
  };

  const handleCloseIF = () => {
    setOpenIFModal(false);
  };

  const [openNewAccessoriesForm, setOpenNAModal] = React.useState(false);

  const handleClickOpenNA = () => {
    setOpenNAModal(true);
  };

  const handleCloseNA = () => {
    setOpenNAModal(false);
  };
  return (
    <>
      <Modal isOpen={openExportForm} size="lg">
        <ModalHeader style={{ margin: 25, justifyContent: "center" }}>
          <h3 className="title">Phiếu xuất phụ tùng</h3>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="pr-md-1">
              <FormGroup>
                <label>Phụ tùng</label>
                <Input name="select" id="exampleSelect" type="select">
                  <option>Phụ tùng 1</option>
                  <option>Phụ tùng 2</option>
                  <option>Phụ tùng 3</option>
                  <option>Phụ tùng 4</option>
                  <option>Phụ tùng 5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="auto" style={{ alignItems: "flex-end", display: "flex" }}>
              <Tooltip title="Thêm">
                <Fab
                  onClick={openExportForm}
                  size="small"
                  style={{ marginBottom: 10 }}
                >
                  <i className="tim-icons icon-simple-add"></i>
                </Fab>
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Card style={{ margin: 25 }}>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID</th>
                    <th>Phụ tùng</th>
                    <th>Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Phụ tùng 1</td>
                    <td>100000 VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Phụ tùng 3</td>
                    <td>300000 VNĐ</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Phụ tùng 3</td>
                    <td>300000 VNĐ</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Row>
          <ColoredLine color="gray" />
          <Row>
            <Col>
              <h4 className="title">Thành tiền</h4>
            </Col>
            <Col md="auto">
              <h4 className="title">700000 VNĐ</h4>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCloseEF}
            className="btn-fill"
            color="primary"
            type="submit"
            style={{ marginRight: 25 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCloseEF}
            className="btn-fill"
            color="primary"
            type="submit"
          >
            Xuất
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={openImportForm} size="lg">
        <ModalHeader>
          <h4 className="title">Phiếu nhập phụ tùng</h4>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Tên phụ tùng</label>
                  <Input name="select" id="exampleSelect" type="select">
                    <option>Phụ tùng 1</option>
                    <option>Phụ tùng 2</option>
                    <option>Phụ tùng 3</option>
                    <option>Phụ tùng 4</option>
                    <option>Phụ tùng 5</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Đơn giá</label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col className="pl-md-1">
                <FormGroup>
                  <label>Số lượng</label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col
                md="auto"
                style={{ alignItems: "flex-end", display: "flex" }}
              >
                <Tooltip title="Thêm">
                  <Fab size="small" style={{ marginBottom: 10 }}>
                    <i className="tim-icons icon-simple-add"></i>
                  </Fab>
                </Tooltip>
              </Col>
            </Row>
            <ColoredLine color="grey" />
            <Table className="tablesorter" responsive>
              <thead className="text-primary">
                <tr>
                  <th>ID</th>
                  <th>Phụ tùng</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Phụ tùng 1</td>
                  <td>100000 VNĐ</td>
                  <td>3</td>
                  <td>300000 VNĐ</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Phụ tùng 3</td>
                  <td>300000 VNĐ</td>
                  <td>1</td>
                  <td>300000 VNĐ</td>
                </tr>
              </tbody>
            </Table>
            <ColoredLine color="grey" />
            <Row>
              <Col>
                <FormGroup>
                  <legend>Tổng cộng</legend>
                </FormGroup>
              </Col>
              <Row>
                <Col md="auto" style={{ marginRight: 25 }}>
                  <legend className="title">600000 VNĐ</legend>
                </Col>
              </Row>
            </Row>
          </Form>
        </ModalBody>

        <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCloseIF}
            className="btn-fill"
            color="primary"
            type="submit"
            style={{ marginRight: 25 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCloseIF}
            className="btn-fill"
            color="primary"
            type="submit"
          >
            Nhập
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={openNewAccessoriesForm} size="sm">
        <ModalHeader>
          <h4 className="title">Thêm phụ tùng mới</h4>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Tên phụ tùng</label>
                  <Row>
                    <Col className="pr-md-1">
                      <Input type="text" />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col className="pr-md-1" md="4">
                <FormGroup>
                  <label>Đơn vị</label>
                  <Input name="select" id="exampleSelect" type="select">
                    <option>Cái</option>
                    <option>Cặp</option>
                    <option>Tấm</option>
                    <option>Thùng</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Thương hiệu</label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Nhà cung cấp</label>
                  <Input type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="pr-md-1">
                <FormGroup>
                  <label>Loại phụ tùng</label>
                  <Input name="select" id="exampleSelect" type="select">
                    <option>Linh kiện</option>
                    <option>Trang trí</option>
                    <option>Bên ngoài</option>
                    <option>Bên trong</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCloseNA}
            className="btn-fill"
            color="primary"
            type="submit"
            style={{ marginRight: 25 }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCloseNA}
            className="btn-fill"
            color="primary"
            type="submit"
          >
            Thêm
          </Button>
        </ModalFooter>
      </Modal>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row style={{ margin: 25, justifyContent: "space-between" }}>
                  <CardTitle tag="h4">Danh sách phụ tùng</CardTitle>

                  <Col md="auto">
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={handleClickOpenIF}
                      style={{ margin: 2 }}
                    >
                      Nhập phụ tùng
                    </Button>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={handleClickOpenEF}
                    >
                      Xuất phụ tùng
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th className="text-center" width={50}>
                        ID
                      </th>
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
                      <th className="text-center badge-danger" scope="row">
                        1
                      </th>
                      <td>Nắp ca bô</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">
                        2
                      </th>
                      <td>Kính chiếu hậu</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-danger" scope="row">
                        3
                      </th>
                      <td>Lốp xe lớn</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">
                        4
                      </th>
                      <td>Lốp xe lớn</td>
                      <td>Ford</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-danger" scope="row">
                        5
                      </th>
                      <td>Vô lăng</td>
                      <td>Toyota</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng trong</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">
                        6
                      </th>
                      <td>Cần số màu hồng nam tính</td>
                      <td>Suzuki</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-danger" scope="row">
                        7
                      </th>
                      <td>Kính cửa sổ</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">
                        8
                      </th>
                      <td>Mô tơ</td>
                      <td>Vinfast</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-danger" scope="row">
                        9
                      </th>
                      <td>Ốc vít</td>
                      <td>RollRoyce</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                    <tr>
                      <th className="text-center badge-warning" scope="row">
                        10
                      </th>
                      <td>Đài Radio</td>
                      <td>Suzuki</td>
                      <td>23412</td>
                      <td>cái</td>
                      <td>phụ tùng ngoài</td>
                      <td>QuocAn Cor.</td>
                    </tr>
                  </tbody>
                </Table>

                <Row style={{ margin: 25, justifyContent: "flex-end" }}>
                  <Tooltip title="Thêm phụ tùng mới" >
                    <Fab
                      onClick={handleClickOpenNA}
                      size="small"
                      style={{ marginBottom: 10 }}
                      color="secondary"
                    >
                      <i className="tim-icons icon-simple-add"></i>
                    </Fab>
                  </Tooltip>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Accessories;
