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
  Input,
  FormGroup,
  Form,
  Alert,
  Label,
} from "reactstrap";

import { Tooltip, Fab, Checkbox } from "@material-ui/core";
import "../components/CustomDesign/SuggestList.css";
const axios = require("axios");
const dateFormat = require("dateformat");

export function validateCustomerInformation(customer) {
  if (!customer.name || !customer.phoneNumber) {
    return false;
  }
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/g;
  const nameRegex = /^[a-zA-Z\s]+$/g;
  return phoneRegex.test(customer.phoneNumber) && nameRegex.test(customer.name);
}

export function validateCarInformation(car) {
  if (!car.numberPlate || !car.VIN || !car.registerId || !car.owner)
    return false;

  const numberPlateRegex = /^\d{1,2}[A-Z]-\d{4,5}$/g;
  const vinRegex = /^[0-9A-Z]{17}$/g;
  const registerIdRegex = /^[0-9A-Za-z]+$/g;
  const ownerIdRegex = /^[A-Za-z]+$/g;
  return (
    numberPlateRegex.test(car.numberPlate) &&
    vinRegex.test(car.VIN) &&
    registerIdRegex.test(car.registerId) &&
    ownerIdRegex.test(car.owner)
  );
}

function RepairedRequestList() {
  const translateRRState = {
    init: "Đang sửa chữa",
    finished: "Đã sửa chữa",
    canceled: "Đã hủy",
  };

  const [RRList, setRRList] = useState([]);
  //const [newRR, setNewRR] = useState(false);
  const [selectedRR, setSelectedRR] = useState(null);
  const [selectedRRState, setSelectedRRState] = useState(null);
  const [disableRRState, setDisableRRState] = useState(true);

  const { userAcc } = useContext(AuthContext);
  const [laborCosts, setLaborCost] = useState([]);
  const [SelectedLabor, setSelectedLabor] = useState(null);
  const [laborName, setLaborName] = useState(null);
  const [laborValue, setLaborValue] = useState("");
  const [onChange, setOnchange] = useState(false);

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [email, setEmail] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [listName, setListName] = useState([]);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  const [brand, setBrand] = useState(null);
  const [numberPlate, setNumberPlate] = useState(null);
  const [VIN, setVIN] = useState(null);
  const [distanceTravelled, setDistanceTravelled] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [owner, setOwner] = useState(null);
  const [color, setColor] = useState(null);
  const [model, setModel] = useState(null);
  const [emptyFieldCarAlert, setEmptyFieldCarAlert] = useState(false);

  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [listAccessoryDB, setListAccessoryDB] = useState(null);
  const [listAccessoryAttach, setListAccessoryAttach] = useState([]);
  const [accessorySearch, setAccessorySearch] = useState("");
  const [accessoryList, setAccessoryList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [issuePrice, setIssuePrice] = useState(0);

  const [canSaveRR, setCanSaveRR] = useState(0); //0 =  false, 2 = true

  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [vat, setVAT] = useState(0);
  const [onBillCreated, setBillCreated] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [alertQuotationVisible, setAlertQuotationVisible] = useState(false);

  const handleClickCreateInvoice = () => {
    setDiscount(0);
    setVAT(0);
    setOpenCreateInvoice(true);
  };

  const handleCloseCreateInvoice = () => {
    setOpenCreateInvoice(false);
  };

  const CreateInvoice = () => {
    let tempBill = {
      discount: discount,
      vat: vat,
      RepairedRequestId: selectedRR.id,
      CustomerId: selectedRR.customerId,
    };
    console.log("[TEMP BILL] " + tempBill);
    let loginToken = localStorage.getItem("LoginToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/bills", tempBill, {
        headers: headers,
      })
      .then((response) => {
        setSelectedBill(response.data);
        setBillCreated(!onBillCreated);
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
    handleCloseCreateInvoice();
  };

  const [listBill, setListBill] = useState([]);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchBillData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/bills", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setListBill(response.data);
        })
        .catch((error) => console.log(error));
    }
    fetchBillData();
  }, [onBillCreated]);

  useEffect(() => {
    if (selectedBill !== null) {
      console.log("BILL VUA MOI TAO");
      console.log(selectedBill);
      handleClickOpenInvoice(selectedBill.id);
      if (open) {
        handleClose();
      }
    }
    // eslint-disable-next-line
  }, [listBill]);

  const createTempCar = () => {
    var newCar = {
      id: "",
      brand: brand,
      numberPlate: numberPlate,
      VIN: VIN,
      distanceTravelled: distanceTravelled,
      registerId: registerId,
      owner: owner,
      color: color,
      model: model,
    };
    if (!validateCarInformation(newCar)) {
      setEmptyFieldCarAlert(true);
      setTimeout(() => {
        setEmptyFieldCarAlert(false);
      }, 3000);
      return;
    }
    setSelectedCar(newCar);
    handleCloseNewCar();
  };

  async function AddNewCar() {
    //const AddNewCar = () => {

    let loginToken = localStorage.getItem("LoginToken");
    let createCar = new FormData();
    createCar.append("Brand", selectedCar.brand);
    createCar.append("NumberPlate", selectedCar.numberPlate);
    createCar.append("VIN", selectedCar.VIN);
    createCar.append("DistanceTravelled", selectedCar.distanceTravelled);
    createCar.append("RegisterId", selectedCar.registerId);
    createCar.append("Owner", selectedCar.owner);
    createCar.append("Color", selectedCar.color);
    createCar.append("Model", selectedCar.model);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/cars", createCar, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        setSelectedCar(response.data);
        console.log("Add new car oke");
        clearCarInputModal();
        setCanSaveRR(2);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onDismissCarEmpty = () => setEmptyFieldAlert(!emptyFieldCarAlert);

  const createTempCustomer = () => {
    var newCustomer = {
      id: "",
      name: name,
      address: address,
      phoneNumber: phoneNum,
      email: email,
    };
    if (!validateCustomerInformation(newCustomer)) {
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldCarAlert(false);
      }, 3000);
      return;
    }

    setSelectedCustomer(newCustomer);
    if (openNewCustomer) {
      setSearch(newCustomer.name);
      handleCloseNewCustomer();
    }
  };

  function AddNewCustomer() {
    let loginToken = localStorage.getItem("LoginToken");
    let createCustomer = new FormData();
    createCustomer.append("Name", name);
    createCustomer.append("Address", address);
    createCustomer.append("PhoneNumber", phoneNum);
    createCustomer.append("Email", email);
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/customers", createCustomer, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        setSelectedCustomer(response.data);
        // if (openNewCustomer) {
        //   setOpenNewCustomer(false);
        // }
        setCanSaveRR(1);
      })
      .catch((error) => {
        console.log(error);
        setAlertVisible(true);
        throw new Error(error);
      });
  }

  const onDismiss = () => setAlertVisible(!alertVisible);
  const onDismissEmpty = () => setEmptyFieldAlert(!emptyFieldAlert);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
      }}
    />
  );

  const [listCar, setListCar] = useState([]);

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchCarData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/cars", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setListCar(response.data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchCustomerData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/customers", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setListName(data);
          //setListName(data.map((dat) => dat.name));
        })
        .catch((error) => console.log(error));
    }
    async function fetchRRData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/repairedrequests/all", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setRRList(data.list);
          setListAccessoryAttach(data.attach);
        })
        .catch((error) => console.log(error));
    }
    async function fetchLaborCostData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/laborcosts", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          setLaborCost(response.data);
        })
        .catch((error) => console.log(error));
    }
    async function fetchAccessoriesData() {
      axios
        .get(process.env.REACT_APP_BASE_URL + "api/accessories", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setListAccessoryDB(data);
        })
        .catch((error) => console.log(error));
    }
    fetchCarData();
    fetchCustomerData();
    fetchRRData();
    fetchAccessoriesData();
    fetchLaborCostData();
  }, [onChange]);

  useEffect(() => {
    if (canSaveRR === 1) {
      if (selectedCar.id === "") {
        AddNewCar();
      } else {
        setCanSaveRR(2);
        console.log(canSaveRR);
      }
    } else if (canSaveRR === 2) {
      if (selectedRR !== null) {
        console.log("[UPDATE]");
        updateRRInDB();
      } else {
        saveRRInDB();
      }
      handleClose();
    }
    // eslint-disable-next-line
  }, [canSaveRR]);

  useEffect(() => {
    setQDList(QDList);
    // eslint-disable-next-line
  }, [onQDListChange]);

  const updateRRInDB = () => {
    //RR !== null
    let loginToken = localStorage.getItem("LoginToken");
    var quotation = {
      state: selectedQuotationState,
      details: selectedQD,
    };
    const tempRR = {
      id: selectedRR.id,
      carId: selectedCar.id,
      customerId: selectedCustomer.id,
      quotation: quotation,
      rrstate: selectedRRState,
    };

    console.log(tempRR);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    };
    axios
      .put(process.env.REACT_APP_BASE_URL + "api/repairedrequests", tempRR, {
        headers: headers,
      })
      .then((response) => {
        setOnchange(!onChange);
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };

  const saveRRInDB = () => {
    let loginToken = localStorage.getItem("LoginToken");
    var quotation = {
      state: selectedQuotationState,
      details: selectedQD,
    };
    const tempRR = {
      carId: selectedCar.id,
      customerId: selectedCustomer.id,
      quotation: quotation,
    };

    console.log(quotation);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + loginToken,
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "api/repairedrequests", tempRR, {
        headers: headers,
      })
      .then((response) => {
        setOnchange(!onChange);
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };

  const confirmQuotation = () => {
    setSelectedQuotationState("confirmed");
    saveQuotationDetails();
  };

  const [onQDListChange, setOnQDListChange] = useState(false);

  const [openNewCustomer, setOpenNewCustomer] = React.useState(false);

  const handleClickOpenNewCustomer = () => {
    setSelectedCustomer(null);
    setOpenNewCustomer(true);
  };

  const handleCloseNewCustomer = () => {
    setOpenNewCustomer(false);
    setAlertVisible(false);
    setEmptyFieldAlert(false);
  };

  const [openNewCar, setOpenNewCar] = React.useState(false);

  const handleClickOpenNewCar = () => {
    clearCarInputModal();
    setOpenNewCar(true);
  };

  const handleCloseNewCar = () => {
    setCarByNumberPlate(null);
    setOpenNewCar(false);
    setEmptyFieldCarAlert(false);
    clearCarInputModal();
  };

  const [openInvoice, setOpenInvoice] = React.useState(false);

  const handleClickOpenInvoice = (billId) => {
    //billId = rrID
    console.log("LIST BILL DEM SS");
    console.log(listBill);
    let bill = listBill.find((bill) => bill.id === billId);
    console.log("BILL DISPLAY");
    console.log(bill);
    setSelectedBill(bill);
    setOpenInvoice(true);
  };

  const handleCloseInvoice = () => {
    setSelectedBill(null);
    setOpenInvoice(false);
  };

  const [open, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setCanSaveRR(0);
    setOpenModal(true);
  };

  const handleClose = () => {
    console.log(selectedRRState);
    //clearQuotation
    clearQDFields();
    setQDList([]);
    setHiddenLaborCost(false);
    setSelectedLabor(null);
    setSelectedQuotationState("not_confirmed");

    //clearRR
    setSelectedRR(null);
    setCanSaveRR(0);
    setSelectedQD(null);
    setSelectedCustomer(null);
    setSelectedCar(null);
    setSelectedRRState(null);
    setDisableRRState(true);
    setSearch("");
    setOpenModal(false);
  };

  const [openCreateQuotation, setOpenCQModal] = React.useState(false);

  const handleClickOpenCQ = () => {
    setOpenCQModal(true);
  };

  const handleClickCloseCQ = () => {
    // clearQDFields();
    // setQDList([]);
    // setHiddenLaborCost(false);
    // setSelectedLabor(null);
    setOpenCQModal(false);
  };

  const saveQuotationDetails = () => {
    if (QDList.length === 0) {
      setAlertQuotationVisible(true);
      return;
    }
    QDList.forEach(function (dt) {
      delete dt.accessoryName;
    });
    setSelectedQD(QDList);
    handleClickCloseCQ();
  };

  const [hiddenLaborCost, setHiddenLaborCost] = React.useState(false);

  const removeDQFromTable = (index) => {
    QDList.splice(index, 1);
    setOnQDListChange(!onQDListChange);
  };

  const addQDToTable = () => {
    if (quantity !== 0 && selectedAccessory !== null) {
      if (hiddenLaborCost && laborName !== "" && laborValue !== "") {
        if (true) {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice:
                issuePrice === 0 ? selectedAccessory.receiptPrice : issuePrice,
              laborCost: laborValue,
              issueName: laborName,
            },
          ]);
        }
        clearQDFields();
      } else {
        if (SelectedLabor === null) {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice:
                issuePrice === 0 ? selectedAccessory.receiptPrice : issuePrice,
            },
          ]);
        } else if (SelectedLabor.name !== "Không") {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice:
                issuePrice === 0 ? selectedAccessory.receiptPrice : issuePrice,
              laborCost: SelectedLabor.value,
              issueName: SelectedLabor.name,
            },
          ]);
        } else {
          setQDList([
            ...QDList,
            {
              accessoryId: selectedAccessory.id,
              accessoryName: selectedAccessory.name,
              quantity: quantity,
              unitPrice:
                issuePrice === 0 ? selectedAccessory.receiptPrice : issuePrice,
            },
          ]);
        }
        clearQDFields();
      }
    }
  };

  const calcTempQuotationTotal = () => {
    if (QDList === null) {
      return 0;
    } else {
      let total = 0;
      QDList.forEach((QD) => {
        if (!QD.hasOwnProperty("laborCosts")) {
          total = Number(total) + Number(QD.quantity) * Number(QD.unitPrice);
        } else {
          total =
            Number(total) +
            Number(QD.quantity) * Number(QD.unitPrice) +
            Number(QD.laborCost);
        }
      });
      return total;
    }
  };

  const clearQDFields = () => {
    setIssuePrice(0);
    setAccessorySearch("");
    setSelectedAccessory(null);
    setQuantity(0);
    setSelectedLabor(null);
    setLaborName("");
    setLaborValue("");
  };

  const onAccessoriesChangeHandler = (e) => {
    const value = e.target.value;
    if (value != null && listAccessoryDB != null) {
      setAccessorySearch(value);
      setSelectedAccessory(null);
      let temp = [];
      if (value) {
        temp = listAccessoryDB.filter((ac) =>
          ac.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      setAccessoryList(temp);
    }
  };

  const renderAccessoriesSuggestions = () => {
    if (accessoryList.length === 0) {
      return null;
    }
    return (
      <div className="sugAccessoriesList">
        {accessoryList.slice(0, 5).map((l, index) => (
          <p
            key={index}
            className="sugAccessoriesItem"
            onClick={() => {
              console.log(l);
              setSelectedAccessory(l);
              setAccessorySearch(l.name);
              setAccessoryList([]);
            }}
          >
            {l.name}
          </p>
        ))}
      </div>
    );
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
    let temp = [];
    if (value) {
      temp = listName.filter((data) =>
        data.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setList(temp);
  };

  const renderSuggestions = () => {
    if (list.length === 0) {
      return null;
    }
    return (
      <div className="sugList">
        {list.slice(0, 5).map((l, index) => (
          <p
            key={index}
            className="sugItem"
            onClick={() => {
              setSelectedCustomer(l);
              console.log(l);
              setSearch(l.name);
              setList([]);
            }}
          >
            {l.name}
          </p>
        ))}
      </div>
    );
  };

  const [CarByNumberPlate, setCarByNumberPlate] = useState(null);
  const [CarNotExist, setCarNotExist] = useState(false);
  const onDismissCarNotExist = () => setCarNotExist(false);

  useEffect(() => {
    if (CarByNumberPlate !== null) {
      setBrand(CarByNumberPlate.brand);
      setModel(CarByNumberPlate.model);
      setColor(CarByNumberPlate.color);
      setOwner(CarByNumberPlate.owner);
      setRegisterId(CarByNumberPlate.registerId);
      setDistanceTravelled(CarByNumberPlate.distanceTravelled);
      setVIN(CarByNumberPlate.vin);
    }
  }, [CarByNumberPlate]);

  const getCarByNumberPlate = () => {
    if (!numberPlate) {
      console.log("Chưa nhập biển số");
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    console.log("[Bien so] " + numberPlate.trim());
    axios
      .get(process.env.REACT_APP_BASE_URL + "api/cars/search", {
        params: {
          type: "numberplate",
          value: numberPlate.trim(),
        },
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCarByNumberPlate(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Xe khong ton tai");
        setCarNotExist(true);
      });
  };

  const clearCarInputModal = () => {
    setBrand(null);
    setModel(null);
    setNumberPlate(null);
    setColor(null);
    setOwner(null);
    setRegisterId(null);
    setDistanceTravelled(null);
    setVIN(null);
  };

  const [QDList, setQDList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchField, setSearchField] = useState("1");
  const [isDateSearch, setIsDateSearch] = useState(false);

  const getSearchField = (e) => {
    setSearchResult([]);
    setSearchTerm("");
    setSearchField(e.target.value);
    console.log("[SEARCH FIELD] " + e.target.value);
    if (e.target.value === "6") {
      var today = new Date();
      var currentDate = today.toISOString().substring(0, 10);
      document.getElementById("searhDate").value = currentDate;
      setIsDateSearch(true);
      filterRRByDate(document.getElementById("searhDate").value);
    } else {
      setIsDateSearch(false);
    }
  };

  const filterRRByDate = (date) => {
    if (date !== null) {
      const newRRList = RRList.filter((RR) => {
        return (
          (dateFormat(RR.createdDate, "dd/mm/yyyy") + "").toString() ===
          (dateFormat(date, "dd/mm/yyyy") + "").toString()
        );
      });
      setSearchResult(newRRList);
    } else {
      setSearchResult(RRList);
    }
  };

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== "") {
      console.log(e.target.value);
      let newRRList = [];
      switch (searchField) {
        case "1":
          newRRList = RRList.filter((RR) => {
            return (listName.find((cus) => cus.id === RR.customerId)?.name + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "2":
          newRRList = RRList.filter((RR) => {
            return (
              listName.find((cus) => cus.id === RR.customerId)?.address + ""
            )
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "3":
          newRRList = RRList.filter((RR) => {
            return (
              listName.find((cus) => cus.id === RR.customerId)?.phoneNumber + ""
            ).includes(e.target.value);
          });
          break;
        case "4":
          newRRList = RRList.filter((RR) => {
            return (listCar.find((car) => car.id === RR.carId)?.model + "")
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          break;
        case "5":
          newRRList = RRList.filter((RR) => {
            return (
              listCar.find((car) => car.id === RR.carId)?.numberPlate + ""
            ).includes(e.target.value);
          });
          break;

        default:
          break;
      }
      setSearchResult(newRRList);
    } else {
      setSearchResult(RRList);
    }
  };

  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedQD, setSelectedQD] = useState(null);
  const [selectedQuotationState, setSelectedQuotationState] =
    useState("not_confirmed");

  const saveRR = () => {
    console.log(selectedCar);
    console.log(selectedCustomer);
    console.log(selectedQD);
    if (
      selectedCar !== null &&
      selectedCustomer !== null &&
      selectedQD !== null
    ) {
      console.log("Lưu car and cus vào DB");
      if (selectedCustomer.id === "") {
        AddNewCustomer();
      } else {
        setCanSaveRR(1);
        console.log(canSaveRR);
      }
    } else {
      console.log("Chưa đủ dữ kiện để lưu");
    }
  };

  const openRR = (RR) => {
    setSelectedRR(RR);
    setSelectedCustomer(listName.find((cus) => cus.id === RR.customerId));
    setSearch(listName.find((cus) => cus.id === RR.customerId).name);
    setSelectedCar(listCar.find((car) => car.id === RR.carId));
    setQDList(RR.quotation.details);

    setSelectedQuotationState(RR.quotation.state);
    setSelectedRRState(RR.state);
    if (RR.state === "init") {
      setDisableRRState(false);
    }
    setSelectedQD(RR.quotation.details);
    handleClickOpen();
  };

  const [isRRHasBill, setIsRRHasBill] = useState(false);

  useEffect(() => {
    if (selectedRR !== null) {
      if (listBill.find((bill) => bill.id === selectedRR.id)) {
        setIsRRHasBill(true);
      } else {
        setIsRRHasBill(false);
      }
    } else {
      setIsRRHasBill(false);
    }
    // eslint-disable-next-line
  }, [selectedRR]);

  return (
    <>
      <div className="content">
        {userAcc.role === "storekeeper" ? (
          <p>Bạn không có quyền truy cập</p>
        ) : RRList === null ||
          laborCosts === null ||
          listName === null ||
          listCar === null ||
          listAccessoryDB === null ? (
          <p>Đang tải dữ liệu lên, vui lòng chờ trong giây lát...</p>
        ) : (
          <div>
            <Modal isOpen={openCreateQuotation} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phiếu báo giá dịch vụ
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  {(selectedRR !== null &&
                    selectedRR.quotation.state === "confirmed") ||
                  selectedQuotationState === "confirmed" ? (
                    <div hidden="true"></div>
                  ) : (
                    <div>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label>Tên phụ tùng</label>
                            <Input
                              name="select"
                              autoComplete="off"
                              type="search"
                              value={accessorySearch}
                              onChange={(e) => onAccessoriesChangeHandler(e)}
                            ></Input>
                            {renderAccessoriesSuggestions()}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Đơn giá (VNĐ)</label>
                            <Input
                              type="text"
                              value={
                                issuePrice === 0 && selectedAccessory !== null
                                  ? selectedAccessory.receiptPrice
                                  : issuePrice
                              }
                              onChange={(e) => {
                                setIssuePrice(
                                  e.target.value
                                    .replace(/\D/, "")
                                    .replace(/^0+/, "")
                                );
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Số lượng</label>
                            <Input
                              type="text"
                              value={quantity}
                              onChange={(e) => {
                                setQuantity(
                                  e.target.value
                                    .replace(/\D/, "")
                                    .replace(/^0+/, "")
                                );
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col hidden={hiddenLaborCost}>
                          <Row>
                            <Col md="4">
                              <label>Chọn dịch vụ</label>
                            </Col>
                            <Col md="4">
                              <label>Tiền phí</label>
                            </Col>
                          </Row>
                        </Col>
                        <Col hidden={!hiddenLaborCost}>
                          <Row>
                            <Col md="4">
                              <label>Tên dịch vụ</label>
                            </Col>
                            <Col md="4">
                              <label>Tiền phí (VNĐ)</label>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col hidden={hiddenLaborCost}>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Input
                                  name="select"
                                  id="exampleSelect"
                                  type="select"
                                  defaultValue={"0"}
                                  onChange={(e) =>
                                    setSelectedLabor({
                                      name: e.target.options[
                                        e.target.selectedIndex
                                      ].text,
                                      value: e.target.value,
                                    })
                                  }
                                >
                                  <option value={"0"}>Không</option>
                                  {laborCosts.map((laborCost) => (
                                    <option value={laborCost.value}>
                                      {laborCost.name}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <h4>
                                {SelectedLabor != null
                                  ? SelectedLabor.value
                                  : "0"}{" "}
                                VNĐ
                              </h4>
                            </Col>
                          </Row>
                        </Col>
                        <Col hidden={!hiddenLaborCost}>
                          <Row>
                            <Col className="pr-md-1">
                              <FormGroup style={{ marginRight: 5 }}>
                                <Input
                                  type="text"
                                  value={laborName}
                                  onChange={(e) => setLaborName(e.target.value)}
                                />
                              </FormGroup>
                            </Col>
                            <Col className="pl-md-1" style={{ marginLeft: 10 }}>
                              <FormGroup style={{ marginLeft: 5 }}>
                                <Input
                                  type="text"
                                  value={laborValue}
                                  onChange={(e) =>
                                    setLaborValue(
                                      e.target.value
                                        .replace(/\D/, "")
                                        .replace(/^0+/, "")
                                    )
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>

                        <Col md="3">
                          <FormGroup>
                            <Checkbox
                              color="primary"
                              onChange={(e) =>
                                setHiddenLaborCost(e.target.checked)
                              }
                            ></Checkbox>
                            <label>Loại phí mới</label>
                          </FormGroup>
                        </Col>
                        <Col
                          md="1"
                          style={{ alignItems: "flex-end", display: "flex" }}
                        >
                          <Tooltip title="Thêm">
                            <Fab
                              size="small"
                              style={{ marginBottom: 10 }}
                              onClick={addQDToTable}
                            >
                              <i className="tim-icons icon-simple-add"></i>
                            </Fab>
                          </Tooltip>
                        </Col>
                      </Row>
                    </div>
                  )}
                  <ColoredLine color="grey" />
                  <table className="table table-borderless table-hover">
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Phụ tùng</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Loại lỗi</th>
                        <th>Phí sửa chữa</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {QDList.map((QD, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {selectedRR !== null &&
                            selectedRR.quotation.state === "confirmed"
                              ? listAccessoryAttach[QD.accessoryId]
                              : listAccessoryDB.find(
                                  (acc) => acc.id === QD.accessoryId
                                ).name}
                          </td>
                          <td>{QD.quantity}</td>
                          <td>{QD.unitPrice} VNĐ</td>
                          <td>
                            {QD.issueName != null ? QD.issueName : "Không có"}
                          </td>
                          <td>{QD.laborCost != null ? QD.laborCost : 0} VNĐ</td>
                          <td>
                            {QD.laborCost != null
                              ? Number(QD.quantity) * Number(QD.unitPrice) +
                                Number(QD.laborCost)
                              : Number(QD.quantity) * Number(QD.unitPrice)}
                            VNĐ
                          </td>
                          {selectedRR !== null &&
                          selectedRR.quotation.state === "confirmed" ? (
                            <td hidden="true"></td>
                          ) : (
                            <Fab
                              size="small"
                              onClick={() => {
                                removeDQFromTable(index);
                              }}
                            >
                              <i className="tim-icons icon-simple-delete"></i>
                            </Fab>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ColoredLine color="grey" />
                  <Row>
                    <Col>
                      <FormGroup>
                        <h3>Tổng cộng</h3>
                      </FormGroup>
                    </Col>
                    <Row>
                      <Col md="auto" style={{ marginRight: 25 }}>
                        <h3 className="title">
                          {calcTempQuotationTotal()} VNĐ
                        </h3>
                      </Col>
                    </Row>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <h3>Trạng thái</h3>
                      </FormGroup>
                    </Col>
                    <Row>
                      <Col md="auto" style={{ marginRight: 25 }}>
                        {selectedQuotationState === "confirmed" ? (
                          <h3 className="title">
                            <font color="green">Đã xác nhận</font>
                          </h3>
                        ) : (
                          <h3 className="title">
                            <font color="red">Chưa xác nhận</font>
                          </h3>
                        )}
                      </Col>
                    </Row>
                  </Row>
                </Form>
                <Alert
                  className="alert-error"
                  color="warning"
                  isOpen={alertQuotationVisible}
                  toggle={() => {
                    setAlertQuotationVisible(!alertQuotationVisible);
                  }}
                >
                  Phải nhập ít nhất một phụ tùng.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ margin: 10, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleClickCloseCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 20 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={saveQuotationDetails}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Lưu
                </Button>
                {selectedRR === null ||
                (selectedRR !== null &&
                  selectedRR.quotation.state !== "confirmed") ? (
                  <Button
                    onClick={confirmQuotation}
                    className="btn-fill"
                    color="primary"
                    type="submit"
                    style={{ marginLeft: 20 }}
                  >
                    Xác nhận
                  </Button>
                ) : (
                  <div hidden="true"></div>
                )}
              </ModalFooter>
            </Modal>
            <Modal isOpen={openInvoice} size="lg">
              <ModalHeader style={{ margin: 25, justifyContent: "center" }}>
                <h3 className="title">Hóa đơn</h3>
              </ModalHeader>
              <ModalBody>
                {selectedBill !== null ? (
                  <div>
                    <Row>
                      <Col>
                        <h4 className="title">Khách hàng</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">Địa chỉ</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.address}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h4 className="title">Số điện thoại</h4>
                      </Col>
                      <Col md="auto">
                        <h4>{selectedBill.customer.phoneNumber}</h4>
                      </Col>
                    </Row>
                    <ColoredLine color="gray" />
                    <Row>
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col>
                              <p style={{ fontSize: 18 }} className="title">
                                Danh sách phụ tùng
                              </p>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          <table className="table table-borderless table-hover">
                            <thead className="text-primary">
                              <tr>
                                <th>ID</th>
                                <th>Phụ tùng</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Loại lỗi</th>
                                <th>Phí sửa chữa</th>
                                <th>Tổng tiền</th>
                              </tr>
                            </thead>
                            {selectedBill.details.length > 0 ? (
                              selectedBill.details.map((QD, index) => (
                                <tbody>
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                      {listAccessoryAttach[QD.accessoryId]}
                                    </td>
                                    <td>{QD.quantity}</td>
                                    <td>{QD.unitPrice} VNĐ</td>
                                    <td>
                                      {QD.issueName != null
                                        ? QD.issueName
                                        : "Không có"}
                                    </td>
                                    <td>
                                      {QD.laborCost != null ? QD.laborCost : 0}{" "}
                                      VNĐ
                                    </td>
                                    <td>
                                      {QD.laborCost != null
                                        ? Number(QD.quantity) *
                                            Number(QD.unitPrice) +
                                          Number(QD.laborCost)
                                        : Number(QD.quantity) *
                                          Number(QD.unitPrice)}
                                      VNĐ
                                    </td>
                                  </tr>
                                </tbody>
                              ))
                            ) : (
                              <tbody></tbody>
                            )}
                          </table>
                        </CardBody>
                      </Card>
                    </Row>
                    <ColoredLine color="gray" />
                    <Row>
                      <Col>
                        <h4 className="title">Thành tiền</h4>
                      </Col>
                      <Col md="auto">
                        <h4 className="title">
                          {selectedBill.totalAmount} VNĐ
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="auto">
                        <h4>Nhân viên tạo phiếu:</h4>
                      </Col>
                      <Col>
                        <h4>{selectedBill.creator.fullName}</h4>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div hidden="true"></div>
                )}
              </ModalBody>
              <ModalFooter style={{ margin: 10, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleCloseInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  OK
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={open} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Phiếu tiếp nhận xe
                </p>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col>
                      <label style={{ fontWeight: "bold" }}>Khách hàng</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Input
                          name="select"
                          id="exampleSelect"
                          type="search"
                          autoComplete="off"
                          value={search}
                          onChange={(e) => onChangeHandler(e)}
                        ></Input>
                        {renderSuggestions()}
                      </FormGroup>
                    </Col>
                    <Col md="auto">
                      <Tooltip title="Thêm khách hàng mới">
                        <Fab
                          onClick={handleClickOpenNewCustomer}
                          size="small"
                          style={{ marginBottom: 10 }}
                        >
                          <i className="tim-icons icon-simple-add"></i>
                        </Fab>
                      </Tooltip>
                    </Col>
                  </Row>
                  {selectedCar === null ? (
                    <Row>
                      <Col>
                        <Label style={{ marginTop: 10, fontWeight: "bold" }}>
                          Thêm xe mới
                        </Label>
                      </Col>
                      <Col sm="auto">
                        <Tooltip title="Thêm xe mới">
                          <Fab
                            onClick={handleClickOpenNewCar}
                            size="small"
                            style={{ marginBottom: 10 }}
                          >
                            <i className="tim-icons icon-simple-add"></i>
                          </Fab>
                        </Tooltip>
                      </Col>
                    </Row>
                  ) : (
                    <div>
                      <Row>
                        <Col>
                          <Label style={{ marginTop: 10, fontWeight: "bold" }}>
                            Thông tin xe
                          </Label>
                        </Col>
                        <Col md="auto">
                          <Label>
                            Xe: {selectedCar.brand}-{selectedCar.model}
                          </Label>
                        </Col>
                        <Col md="auto">
                          <Label> Biển số: {selectedCar.numberPlate}</Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <label style={{ fontWeight: "bold" }}>
                            Tình trạng
                          </label>
                        </Col>
                        <Col md="auto">
                          <Input
                            value={selectedRRState}
                            type="select"
                            disabled={disableRRState}
                            onChange={(e) => setSelectedRRState(e.target.value)}
                          >
                            <option value="init">Đang sửa chữa</option>
                            <option value="finished">Đã sửa chữa</option>
                            <option value="canceled">Hủy</option>
                          </Input>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Form>
              </ModalBody>
              <ModalFooter
                style={{ marginRight: 10, justifyContent: "flex-end" }}
              >
                <Button
                  onClick={handleClose}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 10 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleClickOpenCQ}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 10 }}
                >
                  Báo giá
                </Button>
                {selectedRR !== null && selectedRR.state === "finished" ? (
                  <div>
                    {isRRHasBill ? (
                      <Button
                        onClick={() => {
                          handleClickOpenInvoice(selectedRR.id);
                        }}
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        style={{ marginRight: 10 }}
                      >
                        Xem hóa đơn
                      </Button>
                    ) : (
                      <Button
                        onClick={handleClickCreateInvoice}
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        style={{ marginRight: 10 }}
                      >
                        Thanh Toán
                      </Button>
                    )}
                  </div>
                ) : (
                  <div hidden="true"></div>
                )}

                <Button
                  onClick={saveRR}
                  className="btn-fill"
                  color="primary"
                  type="submit" /*style={{marginRight:20}}*/
                >
                  Lưu
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openNewCustomer} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin khách hàng mới
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 10, marginRight: 10 }}>
                  <FormGroup>
                    <label>Họ và Tên</label>
                    <Input
                      placeholder="Họ và tên"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Địa chỉ Email</label>
                    <Input
                      placeholder="Email"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Số điện thoại</label>
                    <Input
                      placeholder="Số điện thoại"
                      type="text"
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Địa chỉ</label>
                    <Input
                      placeholder="Địa chỉ"
                      type="text"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setEmptyFieldAlert(false);
                      }}
                    />
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
                  style={{ width: 330 }}
                  className="alert-error"
                  color="warning"
                  isOpen={emptyFieldAlert}
                  toggle={onDismissEmpty}
                >
                  Thiếu thông tin khách hàng.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={createTempCustomer}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseNewCustomer}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openNewCar} size="lg">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin xe mới
                </p>
              </ModalHeader>
              <ModalBody>
                <Form
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <Row>
                    <Col>
                      <label>Biển số</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        {/* <label>Biển số</label> */}
                        <Input
                          type="text"
                          onChange={(e) => {
                            onDismissCarNotExist(true);
                            setNumberPlate(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="auto" style={{ marginTop: -5 }}>
                      <Button
                        onClick={() => {
                          console.log("Check xe ton tai trong db");
                          getCarByNumberPlate();
                        }}
                        color="primary"
                      >
                        Kiểm tra
                      </Button>
                    </Col>
                  </Row>
                  <Alert
                    style={{ width: 730 }}
                    className="alert-error"
                    color="warning"
                    isOpen={CarNotExist}
                    toggle={onDismissCarNotExist}
                  >
                    Xe không có trong dữ liệu
                  </Alert>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Hãng xe</label>
                        <Input
                          type="text"
                          value={brand}
                          onChange={(e) => {
                            setBrand(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Model</label>
                        <Input
                          value={model}
                          type="text"
                          onChange={(e) => {
                            setModel(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Màu sắc</label>
                        <Input
                          value={color}
                          type="text"
                          onChange={(e) => {
                            setColor(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Chủ xe</label>
                        <Input
                          value={owner}
                          type="text"
                          onChange={(e) => {
                            setOwner(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <label>Mã đăng kiểm</label>
                        <Input
                          value={registerId}
                          type="text"
                          onChange={(e) => {
                            setRegisterId(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Khoảng cách di chuyển (KM)</label>
                        <Input
                          value={distanceTravelled}
                          type="text"
                          onChange={(e) => {
                            setDistanceTravelled(e.target.value);
                            setEmptyFieldCarAlert(false);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label>VIN</label>
                    <Input
                      value={VIN}
                      type="text"
                      onChange={(e) => {
                        setVIN(e.target.value);
                        setEmptyFieldCarAlert(false);
                      }}
                    />
                  </FormGroup>
                </Form>
                <Alert
                  style={{ width: 730, marginLeft: 10 }}
                  className="alert-error"
                  color="warning"
                  isOpen={emptyFieldCarAlert}
                  toggle={onDismissCarEmpty}
                >
                  Thiếu thông tin xe.
                </Alert>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={() => {
                    if (CarByNumberPlate != null) {
                      setSelectedCar(CarByNumberPlate);
                      handleCloseNewCar();
                    } else {
                      createTempCar();
                    }
                  }}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCloseNewCar}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 10 }}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openCreateInvoice} size="sm">
              <ModalHeader>
                <p style={{ fontSize: 22 }} className="title">
                  Thông tin ưu đãi (Nếu có)
                </p>
              </ModalHeader>
              <ModalBody>
                <Form style={{ marginLeft: 10, marginRight: 10 }}>
                  <FormGroup>
                    <label>Discount</label>
                    <Input
                      type="text"
                      value={discount}
                      onChange={(e) => {
                        setDiscount(
                          e.target.value.replace(/(?!-)[^0-9.]/g, "")
                        );
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>VAT</label>
                    <Input
                      type="text"
                      value={vat}
                      onChange={(e) => {
                        setVAT(e.target.value.replace(/(?!-)[^0-9.]/g, ""));
                      }}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter style={{ margin: 25, justifyContent: "flex-end" }}>
                <Button
                  onClick={handleCloseCreateInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  style={{ marginRight: 25 }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={CreateInvoice}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Tiếp tục
                </Button>
              </ModalFooter>
            </Modal>
            <Row>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>
                      <CardTitle tag="h4">
                        Danh sách phiếu tiếp nhận xe
                      </CardTitle>
                    </Col>
                    <Col md="auto">
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                        onClick={() => {
                          //setNewRR(true);
                          handleClickOpen();
                        }}
                      >
                        Thêm
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2">
                      <Input
                        type="select"
                        defaultValue={"1"}
                        onChange={(e) => getSearchField(e)}
                      >
                        <option value="1">Chủ xe</option>
                        <option value="2">Địa chỉ</option>
                        <option value="3">Số điện thoại</option>
                        <option value="4">Xe</option>
                        <option value="5">Biển số</option>
                        <option value="6">Ngày tiếp nhận</option>
                      </Input>
                    </Col>
                    <Col md="3" hidden={isDateSearch}>
                      <Input
                        value={searchTerm}
                        type="text"
                        placeholder="Nội dung tìm kiếm"
                        onChange={(e) => getSearchTerm(e)}
                      />
                    </Col>
                    <Col md="3" hidden={!isDateSearch}>
                      <Input
                        id="searhDate"
                        type="date"
                        onChange={(e) => filterRRByDate(e.target.value)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {RRList.length < 1 ? (
                    <p style={{ fontSize: 20, marginLeft: 10 }}>
                      Không tìm thấy phiếu tiếp nhận phù hợp
                    </p>
                  ) : (
                    <table className="table table-borderless table-hover">
                      <thead>
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
                        {(searchTerm.length < 1 && searchField !== "6"
                          ? RRList
                          : searchResult
                        ).map((RR, index) => {
                          return (
                            <tr
                              key={index}
                              onDoubleClick={() => {
                                openRR(RR);
                              }}
                            >
                              <th scope="row">{index + 1}</th>
                              <td>
                                {RR.createdDate
                                  ? dateFormat(RR.createdDate, "dd/mm/yyyy")
                                  : "-"}
                              </td>
                              <td>
                                {
                                  listName.find(
                                    (cus) => cus.id === RR.customerId
                                  )?.name
                                }
                              </td>
                              <td>
                                {
                                  listName.find(
                                    (cus) => cus.id === RR.customerId
                                  )?.address
                                }
                              </td>
                              <td>
                                {
                                  listName.find(
                                    (cus) => cus.id === RR.customerId
                                  )?.phoneNumber
                                }
                              </td>
                              <td>
                                {
                                  listCar.find((car) => car.id === RR.carId)
                                    ?.model
                                }
                              </td>
                              <td>
                                {
                                  listCar.find((car) => car.id === RR.carId)
                                    ?.numberPlate
                                }
                              </td>
                              <td>
                                {RR.state === "init" ? (
                                  <font color="yellow">
                                    {translateRRState[RR.state]}
                                  </font>
                                ) : RR.state === "finished" ? (
                                  <font color="green">
                                    {translateRRState[RR.state]}
                                  </font>
                                ) : (
                                  <font color="red">
                                    {translateRRState[RR.state]}
                                  </font>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
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

export default RepairedRequestList;
