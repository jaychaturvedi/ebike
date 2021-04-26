import "./index.scss";
import React, { Component, PureComponent } from "react";
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
  Card,
} from "antd";

import { ReactComponent as MisLogo } from "../../assets/settings_icon1.svg";
import {
  ExclamationCircleFilled,
  FileExclamationFilled,
  PictureFilled,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import ReactAudioPlayer from "react-audio-player";
import img from "./img1.jpg";
import img2 from "./img2.jpg";

import Paper from "../../assets/png/paper.png";

const audio = require("./../../assets/audio/techno.mp3");

const { TabPane } = Tabs;
const { Panel } = Collapse;
const text = `
A dog is a type of domesticated animal.
Known for its loyalty and faithfulness,
it can be found as a welcome guest in many households across the world.
`;

function issue(props: any) {
  console.log(props);
  return (
    <Tabs
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
            <ExclamationCircleFilled
              style={{ color: "white", fontSize: "24px" }}
            />
          </span>
        }
        key="1"
      >
        <div className="status-bar">
          <div>
            Customer Issue
            <br />
            <span> ID : 123456</span>
          </div>
          <div style={{ width: "50%" }}>
            <List itemLayout="vertical" size="small">
              <List.Item>
                Date <div>22 Jan 2012</div>
              </List.Item>
              <List.Item>
                Time<div>9 am - 12 am</div>
              </List.Item>
              <List.Item>
                Status<div>Active</div>
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
            header="Customer / Vehicle Details"
            key="1"
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
            header="Issues Reported"
            key="2"
            className="site-collapse-custom-panel"
          >
            <List itemLayout="vertical">
              <List.Item>
                Category <div>Battery</div>
              </List.Item>
              <List.Item>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent sit amet convallis justo. Suspendisse potenti. Nulla
                ullamcorper rhoncus nunc vel tincidunt. Morbi sit amet orci
                metus. Maecenas ultricies vestibulum ante vel fringilla. Duis
                tristique ex quis cursus dignissim. In id elementum ipsum, eu
                congue neque. Integer fermentum.
              </List.Item>
              <List.Item>
                Voice Message
                <div>
                  <ReactAudioPlayer src={audio} controls />
                </div>
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
                <TextArea
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </List.Item>
              <List.Item>
                Report
                <div>
                  <Button ghost={true}>Browse</Button>
                </div>
              </List.Item>
              <List.Item>
                <Button ghost={true}> Request Feedback</Button>
              </List.Item>
            </List>
          </Panel>
        </Collapse>
      </TabPane>
      <TabPane
        tab={
          <span>
            <PictureFilled style={{ color: "white", fontSize: "24px" }} />
          </span>
        }
        key="2"
        className="image-gallery"
      >
        <h4>Photos Attached</h4>
        <li key="1">
          <img src={img} />
        </li>
        <li key="2">
          <img src={img2} />
        </li>
        <li key="3">
          <img src={img} />
        </li>
      </TabPane>
      <TabPane
        tab={
          <span>
            <FileExclamationFilled
              style={{ color: "white", fontSize: "24px" }}
            />
          </span>
        }
        key="3"
      >
        {" "}
        <Card
          style={{ backgroundColor: "#3c4473", border: "none" }}
          className="past-issues-card"
        >
          <List itemLayout="vertical">
            <p className="card-title">Issues in the past</p>
            <List.Item>
              Battery Dead{" "}
              <div>
                22 Jan 2012 <img src={Paper} height="20" />
              </div>
            </List.Item>
            <List.Item>
              Battery Charging{" "}
              <div>
                22 Mar 2012 <img src={Paper} height="20" />
              </div>
            </List.Item>
            <List.Item>
              Battery Slow Charging{" "}
              <div>
                22 June 2012 <img src={Paper} height="20" />
              </div>
            </List.Item>
            <List.Item>
              Motor Noise{" "}
              <div>
                22 Sep 2012 <img src={Paper} height="20" />
              </div>
            </List.Item>
          </List>
        </Card>
      </TabPane>
    </Tabs>
  );
}

issue.propTypes = {};

export default issue;
