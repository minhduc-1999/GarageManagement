import UserProfile from "views/UserProfile.js";
import Customer from "views/Customer.js";
import Employee from "views/Employee.js";
import Bill from "views/Bill.js";
import Report from "views/Report.js";
import RepairedRequestList from "views/RepairedRequestList.js";
import Accessories from "views/Accessories.js";
import StorageHistory from "views/StorageHistory.js";
import Quotations from "views/Quotations.js";
import Car from "views/Car.js";

var routes = [
  {
    path: "/repairrequestlist",
    name: "Danh sách tiếp nhận xe",
    icon: "tim-icons icon-single-copy-04",
    component: RepairedRequestList,
    layout: "/admin",
  },
  {
    path: "/quotations",
    name: "Danh sách báo giá",
    icon: "tim-icons icon-single-copy-04",
    component: Quotations,
    layout: "/admin",
  },
  {
    path: "/customer",
    name: "Khách hàng",
    icon: "tim-icons icon-single-02",
    component: Customer,
    layout: "/admin",
  },
  {
    path: "/car",
    name: "Quản lý xe",
    icon: "tim-icons icon-single-02",
    component: Car,
    layout: "/admin",
  },
  {
    path: "/accessories",
    name: "Quản lý phụ tùng",
    icon: "tim-icons icon-app",
    component: Accessories,
    layout: "/admin",
  },
  {
    path: "/storagehistory",
    name: "Lịch sử nhập xuất kho",
    icon: "tim-icons icon-single-copy-04",
    component: StorageHistory,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Nhân viên",
    icon: "tim-icons icon-badge",
    component: Employee,
    layout: "/admin",
  },
  {
    path: "/bill",
    name: "Hóa đơn",
    icon: "tim-icons icon-notes",
    component: Bill,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Báo cáo",
    icon: "tim-icons icon-chart-bar-32",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    component: UserProfile,
    layout: "/admin",
  },
];
export default routes;
