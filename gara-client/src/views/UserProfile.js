import React, { useContext, useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { AuthContext } from "../contexts/AuthProvider";
const axios = require("axios");

function UserProfile() {
  const { userAcc } = useContext(AuthContext);
  const [onChange, setOnChange] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [dateOB, setDateOB] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    let userId = localStorage.getItem("UserId");
    axios
      .get(process.env.REACT_APP_BASE_URL + "api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        setFullName(response.data.userClaims.fullName);
        setEmail(response.data.userClaims.email);
        setAddress(response.data.userClaims.address);
        if (response.data.userClaims.dateOB) {
          setDateOB(
            new Date(response.data.userClaims.dateOB)
              .toISOString()
              .split("T")[0]
          );
        }
        setPhoneNum(response.data.userClaims.phoneNumber);
        setLoading(false);
      });
  }, [onChange]);

  const handleUpdateProfile = () => {
    setSuccessAlert(false);
    setFailAlert(false);
    let loginToken = localStorage.getItem("LoginToken");
    let userId = localStorage.getItem("UserId");
    const updateForm = new FormData();
    updateForm.append("id", userId);
    updateForm.append("fullName", fullName);
    updateForm.append("email", email);
    updateForm.append("phoneNumber", phoneNum);
    updateForm.append("dateOB", dateOB);
    updateForm.append("address", address);
    axios
      .put(process.env.REACT_APP_BASE_URL + "api/account", updateForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        setOnChange(!onChange);
        setSuccessAlert(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setFailAlert(true);
      });
  };

  const onDismissSuccess = () => setSuccessAlert(!successAlert);
  const onDismissFail = () => setFailAlert(!failAlert);

  return (
    <>
      <div className="content">
        {isLoading ? (
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <p style={{ fontSize: 25 }} className="title">
                    Ch???nh s???a h??? s??
                  </p>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>C??ng ty qu???n l??</label>
                          <Input
                            defaultValue="GARA Cor."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={userAcc.username}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>H??? v?? t??n</label>
                          <Input
                            value={fullName}
                            placeholder="H??? v?? t??n"
                            type="text"
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            ?????a ch??? email
                          </label>
                          <Input
                            value={email}
                            placeholder="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>?????a ch???</label>
                          <Input
                            value={address}
                            placeholder="?????a ch??? th?????ng tr??"
                            type="text"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Ng??y sinh</label>
                          <Input
                            defaultValue={dateOB}
                            placeholder="Ng??y sinh"
                            type="date"
                            onChange={(e) => setDateOB(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>S??? ??i???n tho???i</label>
                          <Input
                            value={phoneNum}
                            placeholder="S??? ??i???n tho???i"
                            type="number"
                            onChange={(e) => setPhoneNum(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <Alert
                    className="alert-error"
                    color="success"
                    isOpen={successAlert}
                    toggle={onDismissSuccess}
                  >
                    C???p nh???t th??ng tin th??nh c??ng.
                  </Alert>
                  <Alert
                    className="alert-error"
                    color="warning"
                    isOpen={failAlert}
                    toggle={onDismissFail}
                  >
                    C???p nh???t th??ng tin th???t b???i.
                  </Alert>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    onClick={handleUpdateProfile}
                  >
                    C???p nh???t
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/deepLogo.png").default}
                      />
                    </a>
                    <p className="description">Garage's Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens??? bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default UserProfile;
