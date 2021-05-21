import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import {
  Row,
  Col,
  Button,
  CardHeader,
  Card,
  CardBody,
  Progress,
  TabContent,
  TabPane,
} from "reactstrap";

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";
import PageTitle from "../../Layout/AppMain/PageTitle";
import ReportAccesory from "./ReportAccessory/ReportAccessory";

import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  Bar,
  BarChart,
  ComposedChart,
  CartesianGrid,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  faAngleUp,
  faArrowRight,
  faArrowUp,
  faArrowLeft,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  { name: "Tháng 1", uv: 10000000, pv: 2400, amt: 2400 },
  { name: "Tháng 2", uv: 30000000, pv: 1398, amt: 2210 },
  { name: "Tháng 3", uv: 45000000, pv: 9800, amt: 2290 },
  { name: "Tháng 4", uv: 16000000, pv: 3908, amt: 2000 },
  { name: "Tháng 5", uv: 37000000, pv: 4800, amt: 2181 },
  { name: "Tháng 6", uv: 11000000, pv: 3800, amt: 2500 },
  { name: "Tháng 7", uv: 5000000, pv: 4300, amt: 2100 },
  { name: "Tháng 8", uv: 10000000, pv: 6800, amt: 2290 },
  { name: "Tháng 9", uv: 10000000, pv: 7908, amt: 2000 },
  { name: "Tháng 10", uv: 5000000, pv: 9800, amt: 2181 },
  { name: "Tháng 11", uv: 15000000, pv: 3800, amt: 1500 },
  { name: "Tháng 12", uv: 23000000, pv: 4300, amt: 2100 },
];

const Report = () => {
  return (
    <Fragment>
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div>
                <PageTitle
                  heading="Báo cáo"
                  subheading="Báo cáo doanh thu và báo cáo sử dụng phụ tùng"
                  icon="pe-7s-graph3 icon-gradient bg-happy-itmeo"
                />
                <Row>
                  <Col>
                  <Card className="mb-3">
                    <CardHeader className="card-header-tab">
                      <div>
                        Báo cáo doanh thu
                      </div>
                    </CardHeader>
                    <div className="widget-chart p-0">
                      <div className="widget-chart-content">
                        <div className="widget-description mt-0 text-success">
                          <FontAwesomeIcon icon={faArrowUp} />
                          <span className="pl-1">175.5%</span>
                          <span className="text-muted opacity-8 pl-1">
                            doanh thu so với cùng kỳ năm ngoái
                          </span>
                        </div>
                      </div>
                      <ResponsiveContainer height={500}>
                        <AreaChart
                          data={data}
                          margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorPv2"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="10%"
                                stopColor="var(--success)"
                                stopOpacity={0.7}
                              />
                              <stop
                                offset="90%"
                                stopColor="var(--success)"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" />
                          <Tooltip />
                          <Area
                            type="monotoneX"
                            dataKey="uv"
                            stroke="var(--success)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPv2)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="mb-3">
                      <CardHeader className="card-header-tab">
                        <div>
                          Báo cáo sử dụng phụ tùng
                        </div>
                      </CardHeader>
                      <ReportAccesory />
                    </Card>
                  </Col>
                </Row>
              </div>
            </ReactCSSTransitionGroup>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};

export default Report;
