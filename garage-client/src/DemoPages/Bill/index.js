import React, { Fragment } from "react";
import { Router } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import PageTitle from "../../Layout/AppMain/PageTitle";
import BillList from "./BillField/BillList";
import BillDetails from "./BillField/BillDetails";

const Bill = () => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <PageTitle
              heading="Quản lý hóa đơn"
              subheading="Danh sách các hóa đơn và chi tiết hóa đơn"
              icon="pe-7s-news-paper icon-gradient bg-happy-itmeo"
            />
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}>
              <Row>
                <Col md={7}> 
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Danh sách hóa đơn</CardTitle>
                      <BillList />
                    </CardBody>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Chi tiết hóa đơn</CardTitle>
                      <BillDetails />
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

export default Bill;