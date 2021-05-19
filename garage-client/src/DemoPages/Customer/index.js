import React, { Fragment } from "react";
import { Router } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import PageTitle from "../../Layout/AppMain/PageTitle";
import CustomerList from "./CustomerField/CustomerList";
import CustomerRequest from "./CustomerField/CustomerRequest";

const Customer = () => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <PageTitle
              heading="Quản lý khách hàng"
              subheading="Xem danh sách khách hàng và các phiếu sửa chữa của họ"
              icon="pe-7s-users icon-gradient bg-happy-itmeo"
            />
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}>
              <Row>
                <Col md={8}>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Danh sách khách hàng</CardTitle>
                      <CustomerList />
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Danh sách phiếu sửa chữa</CardTitle>
                      <CustomerRequest />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ReactCSSTransitionGroup>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};

export default Customer;
