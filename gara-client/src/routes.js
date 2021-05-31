import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Customer from "views/Customer.js";
import Employee from "views/Employee.js";
import Bill from "views/Bill.js";
import Report from "views/Report.js";
import RepairedRequestList from "views/RepairedRequestList.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/repairrequestlist",
    name: "Danh sách tiếp nhận xe",
    icon: "tim-icons icon-single-copy-04",
    component: RepairedRequestList,
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
];
export default routes;
