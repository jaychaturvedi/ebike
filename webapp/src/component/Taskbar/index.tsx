import "./index.scss";
import React, { Component, PureComponent } from "react";

import BookService from "./service";
import ReportIssue from "./issue";
import RsaLanding from "./rsa";
import {
  Drawer,
  Button,
  Radio,
  Space,
  Tabs,
  Collapse,
  List,
  Avatar,
  Typography,
} from "antd";

class Taskbar extends Component {
  state = { visible: false, selected: "service" };

  showDrawer = (sel: string) => {
    if (this.state.visible == false) {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        visible: false,
      });
    }
    this.setState({ selected: sel });
  };

  tabpanel = (sel: string) => {
    switch (sel) {
      case "service":
        return <BookService />;
        break;
      case "issue":
        return <ReportIssue />;
        break;
      case "rsa":
        return <RsaLanding />;
        break;

      default:
        return <div></div>;
        break;
    }
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const comp = this.tabpanel(this.state.selected);
    return (
      <div className="container">
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => this.showDrawer("service")}
            //style={{ margin: "500px" }}
          >
            Service
          </Button>
          <Button
            onClick={() => this.showDrawer("issue")}
            //style={{ margin: "700px" }}
          >
            Issue
          </Button>
          <Button
            onClick={() => this.showDrawer("rsa")}
            //style={{ margin: "400px" }}
          >
            RSA
          </Button>
        </div>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={"right"}
          width="500px"
          maskClosable={true}
          mask={true}
          className="drawer"
          style={{ marginTop: "41px" }}
          zIndex={0}
        >
          <div> {comp}</div>
          {/* <BookService /> */}
          {/* <ReportIssue /> */}
          {/* <RsaLanding /> */}
          {/* <Tabs
            type="line"
            addIcon={MisLogo}
            size="small"
            tabBarStyle={{
              backgroundColor: "#383e5f",
              margin: "0",
              color: "white",
              textAlign: "center",
            }}
          >
            <TabPane
              tab={
                <span>
                  <MisLogo />
                </span>
              }
              key="1"
            >
              <div className="status-bar">
                <div>
                  Book a Service
                  <br />
                  <span> Malleshwaram Bangalore</span>
                </div>
                <div style={{ width: "50%" }}>
                  <List itemLayout="vertical" size="small">
                    <List.Item>
                      Booked For <div>22 Jan 2012</div>
                    </List.Item>
                    <List.Item>
                      Slot<div>9 am - 12 am</div>
                    </List.Item>
                    <List.Item>
                      Booking Status<div>Active</div>
                    </List.Item>
                  </List>
                </div>
              </div>
              <Collapse
                defaultActiveKey={["1"]}
                className="site-collapse-custom-collapse"
                bordered={false}
                ghost={true}
                accordion={true}
              >
                <Panel
                  header="Booking Details"
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <List itemLayout="vertical">
                    <List.Item>
                      Booked For <div>22 Jan 2012</div>
                    </List.Item>
                    <List.Item>
                      Slot<div>9 am - 12 am</div>
                    </List.Item>
                    <List.Item>
                      Booking Status<div>Active</div>
                    </List.Item>
                  </List>
                </Panel>
                <Panel
                  header="Customer/Vehicle details"
                  key="2"
                  className="site-collapse-custom-panel"
                >
                  <List itemLayout="vertical">
                    <List.Item>
                      Name <div>Ashok</div>
                    </List.Item>
                    <List.Item>
                      Vehicle Id<div>Vh-32434</div>
                    </List.Item>
                    <List.Item>
                      Battery Id<div>BT 132434</div>
                    </List.Item>
                    <List.Item>
                      Vehicle Type<div>Hum</div>
                    </List.Item>
                    <List.Item>
                      Next Service Due<div>01 march 2012</div>
                    </List.Item>
                  </List>
                </Panel>
                <Panel
                  header="Response"
                  key="3"
                  className="site-collapse-custom-panel"
                >
                  <List itemLayout="vertical">
                    <List.Item>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Praesent sit amet convallis justo. Suspendisse potenti.
                      Nulla ullamcorper rhoncus nunc vel tincidunt. Morbi sit
                      amet orci metus. Maecenas ultricies vestibulum ante vel
                      fringilla. Duis tristique ex quis cursus dignissim. In id
                      elementum ipsum, eu congue neque. Integer fermentum.
                    </List.Item>
                    <List.Item>
                      Report<div>F123344.pdf</div>
                    </List.Item>
                    <List.Item>
                      <Button>Request Feedback</Button>
                    </List.Item>
                  </List>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MisLogo />
                </span>
              }
              key="2"
            >
              <Collapse
                defaultActiveKey={["1"]}
                className="site-collapse-custom-collapse"
                bordered={false}
                ghost={true}
                accordion={true}
              >
                <Panel
                  header="Booking Details"
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="Customer/Vehicle details"
                  key="2"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="Response"
                  key="3"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MisLogo />
                </span>
              }
              key="3"
            >
              <Collapse
                defaultActiveKey={["1"]}
                className="site-collapse-custom-collapse"
                bordered={false}
                ghost={true}
                accordion={true}
              >
                <Panel
                  header="Booking Details"
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="Customer/Vehicle details"
                  key="2"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
                <Panel
                  header="Response"
                  key="3"
                  className="site-collapse-custom-panel"
                >
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </TabPane>
          </Tabs> */}
        </Drawer>
      </div>
    );
  }
}

export default Taskbar;
