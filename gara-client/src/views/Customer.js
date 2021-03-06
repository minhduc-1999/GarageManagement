import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "contexts/AuthProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";
const axios = require("axios");
const dateFormat = require("dateformat");

function Customer() {
  const { userAcc } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  //searchCombo-start
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [searchField, setSearchField] = useState("1");

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
    if (e.target.value === "5") {
      var today = new Date();
      var currentDate = today.toISOString().substring(0, 10);
      document.getElementById("searhDate").value = currentDate;
      setIsDateSearch(true);
      filterCusByDate(document.getElementById("searhDate").value);
    } else {
      setIsDateSearch(false);
    }
  };

  const filterCusByDate = (date) => {
    if (date !== null) {
      const newCusList = customers.filter((cus) => {
        return (
          (dateFormat(cus.createdDate, "dd/mm/yyyy") + "").toString() ===
          (dateFormat(date, "dd/mm/yyyy") + "").toString()
        );
      });
      setSearchResult(newCusList);
    } else {
      setSearchResult(customers);
    }
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      console.log(e.target.value);
      let newCusList = [];
      switch (searchField) {
        case "1":
          newCusList = customers.filter((cus) => {
            return (cus.name + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "2":
          newCusList = customers.filter((cus) => {
            return (cus.address + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "3":
          newCusList = customers.filter((cus) => {
            return (cus.email + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "4":
          newCusList = customers.filter((cus) => {
            return (cus.phoneNumber + "").includes(e.target.value);
          });
          break;

        default:
          break;
      }
      setSearchResult(newCusList);
    } else {
      setSearchResult(customers);
    }
  };
  //searchCombo-end

  const renderCustomers = () =>
    (searchTerm.length < 1 && searchField !== "5"
      ? customers
      : searchResult
    ).map((cus, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{cus.name}</td>
        <td>{cus.address}</td>
        <td>{cus.email}</td>
        <td>{cus.phoneNumber}</td>
        <td>{dateFormat(cus.createdDate, "dd/mm/yyyy")}</td>
      </tr>
    ));

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchCustomerData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/customers", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setCustomers(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchCustomerData();
  }, []);

  return (
    <>
      <div className="content">
        {userAcc.role === "storekeeper" ? (
          <p>B???n kh??ng c?? quy???n truy c???p</p>
        ) : customers.length < 1 ? (
          <p>??ang t???i d??? li???u l??n, vui l??ng ch??? trong gi??y l??t...</p>
        ) : (
          <div>
            <Row>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Danh s??ch kh??ch h??ng</CardTitle>
                  <Row>
                    <Col md="2">
                      <Input
                        type="select"
                        defaultValue={"1"}
                        onChange={(e) => getSearchField(e)}
                      >
                        <option value="1">T??n kh??ch h??ng</option>
                        <option value="2">?????a ch???</option>
                        <option value="3">Email</option>
                        <option value="4">S??? ??i???n tho???i</option>
                        <option value="5">Ng??y ????ng k??</option>
                      </Input>
                    </Col>
                    <Col md="3" hidden={isDateSearch}>
                      <Input
                        value={searchTerm}
                        type="text"
                        placeholder="T??m ki???m kh??ch h??ng"
                        onChange={(e) => getSearchTerm(e)}
                      />
                    </Col>
                    <Col md="3" hidden={!isDateSearch}>
                      <Input
                        id="searhDate"
                        type="date"
                        onChange={(e) => filterCusByDate(e.target.value)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {renderCustomers().length <= 0 ? (
                    <p style={{ fontSize: 20, marginLeft: 10 }}>
                      Kh??ng t??m th???y kh??ch h??ng ph?? h???p
                    </p>
                  ) : (
                    <table class="table table-borderless table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>STT</th>
                          <th>H??? v?? t??n</th>
                          <th>?????a ch???</th>
                          <th>Email</th>
                          <th>S??? ??i???n tho???i</th>
                          <th>Ng??y ????ng k??</th>
                        </tr>
                      </thead>
                      <tbody>{renderCustomers()}</tbody>
                    </table>
                  )}
                </CardBody>
              </Card>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}

export default Customer;
