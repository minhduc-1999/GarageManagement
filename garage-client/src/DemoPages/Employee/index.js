import React, { Fragment } from "react";
import { Router } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Card, CardBody, CardTitle } from "reactstrap";

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import PageTitle from "../../Layout/AppMain/PageTitle";
import EmployeeCell from "./EmployeeCell/EmployeeCell";

const Employee = () => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <PageTitle
              heading="Quản lý nhân viên"
              subheading="Thêm, xóa, sửa thông tin nhân viên"
              icon="pe-7s-id icon-gradient bg-happy-itmeo"
            />
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Danh sách nhân viên</CardTitle>
                    <EmployeeCell />
                  </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};

export default Employee;
