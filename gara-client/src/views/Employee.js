import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
const axios = require("axios");
const dateFormat = require("dateformat");

export function validateUser(user) {
  var emailRegExp = new RegExp(
    "^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+.[a-zA-Z]+"
  );
  var passwordRegExp = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,}$"
  );

  var phoneNumberRegExp = new RegExp(
    "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
  );

  var fullNameRegExp = new RegExp("^[a-zA-Z ]+$");

  var usernameRegExp = new RegExp(
    "^(?=.{5,20}$)(?![.])(?!.*[.]{2})[a-zA-Z0-9.]+(?<![.])$"
  );

  if (
    user.roleId &&
    user.roleId !== "" &&
    passwordRegExp.test(user.password) &&
    emailRegExp.test(user.email) &&
    usernameRegExp.test(user.username) &&
    phoneNumberRegExp.test(user.phoneNumber) &&
    user.address &&
    user.address !== "" &&
    fullNameRegExp.test(user.fullName) &&
    user.dateOB &&
    user.dateOB !== ""
  ) {
    return true;
  }
  return false;
}

function Employee() {
  const { userAcc } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userRoles, setUserRoles] = useState(null);
  const [onAddNewUser, setOnAddNewUser] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [dateOB, setDateOB] = useState(null);
  const [address, setAddress] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [emptyFiledAlert, setEmptyFieldAlert] = useState(false);
  const [onChange, setOnchange] = useState(false);
  const [onResetPass, setOnResetPass] = useState(false);
  const [onResetPassUser, setOnResetPassUser] = useState(null);
  const [newPass, setNewPass] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [searchField, setSearchField] = useState("1");
  const [onConfirmDelete, setOnConfirmDelete] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [alertPasswordEmpty, setAlertPasswordEmpty] = useState(false);

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
    if (e.target.value === "2") {
      var today = new Date();
      var currentDate = today.toISOString().substring(0, 10);
      document.getElementById("searhDate").value = currentDate;
      setIsDateSearch(true);
      filterUserByDate(document.getElementById("searhDate").value);
    } else {
      setIsDateSearch(false);
    }
  };

  const translateRoles = {
    admin: "admin",
    manager: "quản lý",
    storekeeper: "thủ kho",
    receptionist: "nhân viên tiếp nhận",
    employee: "nhân viên sửa chữa",
  };

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchUserData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/users", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchUserRoles() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/users/roles", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setUserRoles(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchUserData();
    fetchUserRoles();
  }, [onChange]);

  const addNewUser = () => {
    if (
      !validateUser({
        roleId: roleId,
        email: email,
        password: password,
        username: username,
        phoneNumber: phoneNum,
        address: address,
        fullName: fullName,
        dateOB: dateOB,
      })
    ) {
      setEmptyFieldAlert(true);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let createUser = new FormData();
    createUser.append("username", username);
    createUser.append("password", password);
    createUser.append("roleId", roleId);
    createUser.append("fullName", fullName);
    createUser.append("email", email);
    createUser.append("phoneNumber", phoneNum);
    createUser.append("dateOB", dateOB);
    createUser.append("address", address);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/users", createUser, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        setOnchange(!onChange);
        setOnAddNewUser(!onAddNewUser);
      })
      .catch((error) => {
        setAlertVisible(true);
      });
  };

  const handleResetPass = () => {
    if (!newPass) {
      setAlertPasswordEmpty(true);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let resetPassForm = new FormData();
    resetPassForm.append("id", onResetPassUser);
    resetPassForm.append("newpassword", newPass);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/users/reset", resetPassForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        setOnchange(!onChange);
        setOnResetPass(false);
        setNewPass("");
      })
      .catch((error) => console.log(error));
  };

  const handleOpenDialog = () => {
    setOnAddNewUser(!onAddNewUser);
    setAlertVisible(false);
    setEmptyFieldAlert(false);
  };
  const onDismiss = () => setAlertVisible(!alertVisible);
  const onDismissEmpty = () => setEmptyFieldAlert(!emptyFiledAlert);

  const filterUserByDate = (date) => {
    if (date !== null) {
      const newUserList = users.filter((user) => {
        return (
          dateFormat(Object.values(user)[3].dateOB, "dd/mm/yyyy") ===
          dateFormat(date, "dd/mm/yyyy")
        );
      });
      setSearchResult(newUserList);
    } else {
      setSearchResult(users);
    }
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      let newUserList = [];
      switch (searchField) {
        case "1":
          newUserList = users.filter((user) => {
            return Object.values(user)[3]
              .fullName.toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "3":
          newUserList = users.filter((user) => {
            return Object.values(user)[3]
              .address.toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "4":
          newUserList = users.filter((user) => {
            return Object.values(user)[3]
              .email.toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "5":
          newUserList = users.filter((user) => {
            return Object.values(user)[3]
              .phoneNumber.toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;

        default:
          break;
      }
      setSearchResult(newUserList);
    } else {
      setSearchResult(users);
    }
  };

  const renderUser = () =>
    (searchTerm.length < 1 && searchField !== "2" ? users : searchResult).map(
      (user, index) => {
        return (
          <tr
            key={index}
            onClick={() => {
              setOnResetPassUser(user.id);
              setSelectUser(user.username);
              setOnResetPass(true);
            }}
          >
            <th scope="row">{index + 1}</th>
            <td>{user.userClaims.fullName}</td>
            <td>
              {user.userClaims.dateOB
                ? dateFormat(user.userClaims.dateOB, "dd/mm/yyyy")
                : "-"}
            </td>
            <td>{user.userClaims.address ? user.userClaims.address : "-"}</td>
            <td>{user.userClaims.email ? user.userClaims.email : "-"}</td>
            <td>
              {user.userClaims.phoneNumber ? user.userClaims.phoneNumber : "-"}
            </td>
            <td>{user.username}</td>
            <td>{translateRoles[user.role]}</td>
          </tr>
        );
      }
    );

  const checkUserDelete = () => {
    if (selectUser === userAcc.username) {
      setAlertDelete(true);
      return;
    }
    setOnConfirmDelete(true);
  };

  const handleDeleteUser = () => {
    let loginToken = localStorage.getItem("LoginToken");
    axios
      .delete(process.env.REACT_APP_BASE_URL + "api/users/" + onResetPassUser, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        setOnConfirmDelete(false);
        setOnResetPass(false);
        setNewPass("");
        setOnchange(!onChange);
      })
      .catch((err) => console.log(err));
  };

  const onDismissDeleteAlert = () => setAlertDelete(false);
  const onDismissEmptyAlert = () => setAlertPasswordEmpty(false);

  return (
    <>
      <div className="content">
        {userAcc.role !== "admin" ? (
          <p>Bạn không có quyền truy cập</p>
        ) : users.length < 1 || userRoles === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Modal scrollable={false} isOpen={onAddNewUser} size="lg">
              <ModalHeader style={{ justifyContent: "center" }}>
                <p style={{ fontSize: 25 }} className="title">
                  Thêm nhân viên mới
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 30, marginRight: 30 }}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Tài khoản</Label>
                        <Input
                          type="text"
                          name="user"
                          id="user"
                          placeholder="Tài khoản"
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setEmptyFieldAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="examplePassword">Mật khẩu</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Mật khẩu"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setEmptyFieldAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Họ và tên</Label>
                        <Input
                          type="text"
                          name="user"
                          id="lastName"
                          placeholder="Họ và tên"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>Chức vụ</Label>
                        <Input
                          defaultValue={"DEFAULT"}
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(e) => setRoleId(e.target.value)}
                        >
                          <option value="DEFAULT" disabled>
                            Chọn chức vụ
                          </option>
                          {userRoles.map((item) => (
                            <option key={item.id} value={item.id}>
                              {translateRoles[item.roleName]}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Ngày sinh</Label>
                        <Input
                          type="date"
                          name="user"
                          id="dateOB"
                          placeholder="Ngày sinh"
                          onChange={(e) => setDateOB(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="text"
                          name="user"
                          id="email"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Số điện thoại</Label>
                        <Input
                          type="text"
                          name="user"
                          id="phoneNum"
                          placeholder="Số điện thoại"
                          onChange={(e) => setPhoneNum(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">Địa chỉ</Label>
                        <Input
                          type="text"
                          name="user"
                          id="address"
                          placeholder="Địa chỉ"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Alert
                    className="alert-error"
                    color="warning"
                    isOpen={alertVisible}
                    toggle={onDismiss}
                  >
                    Tên tài khoản đã được sử dụng.
                  </Alert>
                  <Alert
                    style={{ margin: 0 }}
                    className="alert-error"
                    color="warning"
                    isOpen={emptyFiledAlert}
                    toggle={onDismissEmpty}
                  >
                    Tạo tài khoản không thành công.
                  </Alert>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                  onClick={addNewUser}
                >
                  Thêm
                </Button>
                <Button
                  className="btn-fill"
                  color="secondary"
                  type="submit"
                  onClick={handleOpenDialog}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={onResetPass} size="sm">
              <ModalBody>
                <Form>
                  <Label>
                    Tạo lại mật khẩu cho user: <strong>{selectUser}</strong>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Mật khẩu mới"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  ></Input>
                </Form>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertDelete}
                  toggle={onDismissDeleteAlert}
                  style={{ width: 330 }}
                >
                  Bạn không thể xóa chính mình
                </Alert>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertPasswordEmpty}
                  toggle={onDismissEmptyAlert}
                  style={{ width: 330 }}
                >
                  Mật khẩu mới không được để trống
                </Alert>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ marginLeft: 7 }}
                  className="btn-fill"
                  color="primary"
                  onClick={checkUserDelete}
                >
                  Xóa user
                </Button>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleResetPass}
                >
                  Xác nhận
                </Button>
                <Button
                  style={{ marginRight: 7 }}
                  className="btn-fill"
                  color="secondary"
                  type="submit"
                  onClick={() => {
                    setOnResetPass(false);
                    setAlertDelete(false);
                    setAlertPasswordEmpty(false);
                  }}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={onConfirmDelete} size="sm">
              <ModalBody>
                <p>Bạn có muốn xóa user: {selectUser}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleDeleteUser}
                >
                  Xác nhận
                </Button>
                <Button
                  className="btn-fill"
                  color="secondary"
                  type="submit"
                  onClick={() => setOnConfirmDelete(false)}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <CardTitle tag="h4">Danh sách nhân viên</CardTitle>
                      </Col>
                      <Col md="6" />
                      <Col md="auto">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={handleOpenDialog}
                        >
                          Thêm NV mới
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <Input
                          //value={searchTerm}
                          type="select"
                          defaultValue={"1"}
                          onChange={(e) => getSearchField(e)}
                        >
                          <option value="1">Họ và Tên</option>
                          <option value="2">Ngày sinh</option>
                          <option value="3">Địa chỉ</option>
                          <option value="4">Email</option>
                          <option value="5">Số điện thoại</option>
                        </Input>
                      </Col>
                      <Col md="3" hidden={isDateSearch}>
                        <Input
                          value={searchTerm}
                          type="text"
                          placeholder="Tìm kiếm nhân viên"
                          onChange={(e) => getSearchTerm(e)}
                        />
                      </Col>
                      <Col md="3" hidden={!isDateSearch}>
                        <Input
                          id="searhDate"
                          type="date"
                          onChange={(e) => filterUserByDate(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {renderUser().length <= 0 ? (
                      <p style={{ fontSize: 20, marginLeft: 10 }}>
                        Không tìm thấy nhân viên phù hợp
                      </p>
                    ) : (
                      <table class="table table-borderless table-hover">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Tên đăng nhập</th>
                            <th>Chức vụ</th>
                          </tr>
                        </thead>
                        <tbody>{renderUser()}</tbody>
                      </table>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default Employee;
