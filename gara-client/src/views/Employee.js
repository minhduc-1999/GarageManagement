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
  const [alertDelete, setAlertDelete] = useState(false)
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
    manager: "qu???n l??",
    storekeeper: "th??? kho",
    receptionist: "nh??n vi??n ti???p nh???n",
    employee: "nh??n vi??n s???a ch???a",
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
    if (!roleId || !username || !password) {
      console.log("Thi???u th??ng tin t???o t??i kho???n");
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
        console.log(response);
        setOnchange(!onChange);
        setOnAddNewUser(!onAddNewUser);
      })
      .catch((error) => {
        console.log(error);
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
        console.log("Doi pass thanh cong cho user " + onResetPassUser);
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
      console.log(e.target.value);
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
            onDoubleClick={() => {
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
            <td>
              {
                translateRoles[user.role]
              }
            </td>
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
  }

  const handleDeleteUser = () => {
    let loginToken = localStorage.getItem('LoginToken');
    axios.delete(process.env.REACT_APP_BASE_URL + 'api/users/' + onResetPassUser, {
      headers: {
        Authorization: 'Bearer ' + loginToken,
      },
    })
    .then(res => {
      setOnConfirmDelete(false);
      setOnResetPass(false);
      setNewPass('');
      setOnchange(!onChange);
    })
    .catch(err => console.log(err));
  }

  const onDismissDeleteAlert = () => setAlertDelete(false);
  const onDismissEmptyAlert = () => setAlertPasswordEmpty(false);

  return (
    <>
      <div className="content">
        {userAcc.role !== "admin" ? (
          <p>B???n kh??ng c?? quy???n truy c???p</p>
        ) : users.length < 1 || userRoles === null ? (
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <div>
            <Modal scrollable={false} isOpen={onAddNewUser} size="lg">
              <ModalHeader style={{ justifyContent: "center" }}>
                <p style={{ fontSize: 25 }} className="title">
                  Th??m nh??n vi??n m???i
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 30, marginRight: 30 }}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">T??i kho???n</Label>
                        <Input
                          type="text"
                          name="user"
                          id="user"
                          placeholder="T??i kho???n"
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setEmptyFieldAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="examplePassword">M???t kh???u</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="M???t kh???u"
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
                        <Label for="exampleEmail">H??? v?? t??n</Label>
                        <Input
                          type="text"
                          name="user"
                          id="lastName"
                          placeholder="H??? v?? t??n"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label>Ch???c v???</Label>
                        <Input
                          defaultValue={"DEFAULT"}
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(e) => setRoleId(e.target.value)}
                        >
                          <option value="DEFAULT" disabled>
                            Ch???n ch???c v???
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
                        <Label for="exampleEmail">Ng??y sinh</Label>
                        <Input
                          type="date"
                          name="user"
                          id="dateOB"
                          placeholder="Ng??y sinh"
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
                        <Label for="exampleEmail">S??? ??i???n tho???i</Label>
                        <Input
                          type="text"
                          name="user"
                          id="phoneNum"
                          placeholder="S??? ??i???n tho???i"
                          onChange={(e) => setPhoneNum(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label for="exampleEmail">?????a ch???</Label>
                        <Input
                          type="text"
                          name="user"
                          id="address"
                          placeholder="?????a ch???"
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
                    T??n t??i kho???n ???? ???????c s??? d???ng.
                  </Alert>
                  <Alert
                    style={{ margin: 0 }}
                    className="alert-error"
                    color="warning"
                    isOpen={emptyFiledAlert}
                    toggle={onDismissEmpty}
                  >
                    T??n t??i kho???n v?? m???t kh???u kh??ng ???????c ????? tr???ng.
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
                  Th??m
                </Button>
                <Button
                  className="btn-fill"
                  color="secondary"
                  type="submit"
                  onClick={handleOpenDialog}
                >
                  H???y
                </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={onResetPass} size="sm">
              <ModalBody>
                <Form>
                  <Label>
                    T???o l???i m???t kh???u cho user: <strong>{selectUser}</strong>
                  </Label>
                  <Input
                    type="text"
                    placeholder="M???t kh???u m???i"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  ></Input>
                </Form>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertDelete}
                  toggle={onDismissDeleteAlert}
                  style={{width: 330}}
                >
                  B???n kh??ng th??? x??a ch??nh m??nh
                </Alert>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertPasswordEmpty}
                  toggle={onDismissEmptyAlert}
                  style={{width: 330}}
                >
                  M???t kh???u m???i kh??ng ???????c ????? tr???ng
                </Alert>
              </ModalBody>
              <ModalFooter>
                    <Button
                      style={{marginLeft: 7}}
                      className="btn-fill"
                      color="primary"
                      onClick={checkUserDelete}
                    >
                      X??a user
                    </Button>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                      onClick={handleResetPass}
                    >
                      X??c nh???n
                    </Button>
                    <Button
                      style={{marginRight: 7}}
                      className="btn-fill"
                      color="secondary"
                      type="submit"
                      onClick={() => {setOnResetPass(false); setAlertDelete(false); setAlertPasswordEmpty(false)}}
                    >
                      H???y
                    </Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={onConfirmDelete} size="sm">
              <ModalBody>
                <p>B???n c?? mu???n x??a user: {selectUser}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={handleDeleteUser}
                >
                  X??c nh???n
                </Button>
                <Button
                  className="btn-fill"
                  color="secondary"
                  type="submit"
                  onClick={() => setOnConfirmDelete(false)}
                >
                  H???y
                </Button>
              </ModalFooter>
            </Modal>

            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <CardTitle tag="h4">Danh s??ch nh??n vi??n</CardTitle>
                      </Col>
                      <Col md="6" />
                      <Col md="auto">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={handleOpenDialog}
                        >
                          Th??m NV m???i
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
                          <option value="1">H??? v?? T??n</option>
                          <option value="2">Ng??y sinh</option>
                          <option value="3">?????a ch???</option>
                          <option value="4">Email</option>
                          <option value="5">S??? ??i???n tho???i</option>
                        </Input>
                      </Col>
                      <Col md="3" hidden={isDateSearch}>
                        <Input
                          value={searchTerm}
                          type="text"
                          placeholder="T??m ki???m nh??n vi??n"
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
                        Kh??ng t??m th???y nh??n vi??n ph?? h???p
                      </p>
                    ) : (
                      <table class="table table-borderless table-hover">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>H??? v?? t??n</th>
                            <th>Ng??y sinh</th>
                            <th>?????a ch???</th>
                            <th>Email</th>
                            <th>S??? ??i???n tho???i</th>
                            <th>T??n ????ng nh???p</th>
                            <th>Ch???c v???</th>
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
