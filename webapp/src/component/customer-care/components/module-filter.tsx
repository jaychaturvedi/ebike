import "./index.scss";
import React, { PureComponent } from "react";
import DropDownFilter from "../components/dropdown-filter";
import GroupedDropDownFilter from "../components/grouped-dropdown-filter";
// import { ReactComponent as Vehicle } from "../../../assets/vehicle_icon.svg";
import { ReactComponent as IssuesModuleIcon } from "../../../assets/svg/customer-care-issues-module.svg";
import { ReactComponent as RSAModuleIcon } from "../../../assets/svg/customer-care-rsa-module.svg";
import { ReactComponent as ServiceModuleIcon } from "../../../assets/svg/customer-care-service-module.svg";
import { ReactComponent as RSA } from "../../../assets/svg/customer-care-rsa.svg";
import { ReactComponent as Service } from "../../../assets/svg/customer-care-service.svg";
import { ReactComponent as Issues } from "../../../assets/svg/customer-care-issues.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Dropdown, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
const useStyles = makeStyles({
  root: {},
});
interface ModuleFilterProps {
  updateModule: (e: any) => void;
  module: string;
}

interface ModuleFilterStates {}

function getModuleName(key: string) {
  switch (key) {
    case "service":
      return "Service Bookings";
    case "issues":
      return "Customer Issues";
    case "rsa":
      return "RSA Requests";
    default:
      return "No Module Selected";
  }
}

function getModuleIcon(key: string) {
  switch (key) {
    case "service":
      return <ServiceModuleIcon style={{ marginLeft: "5px" }} />;
    case "issues":
      return (
        <IssuesModuleIcon
          style={{ marginLeft: "5px" }}
          width='60px'
          height='24px'
          className={`dropdown-svg-fill`}
        />
      );
    case "rsa":
      return (
        <RSAModuleIcon
          style={{ marginLeft: "5px" }}
          width='60px'
          height='24px'
          className={`dropdown-svg-fill`}
        />
      );
    default:
      return <div>No Module Selected</div>;
  }
}
export default function ModuleFilter(props: ModuleFilterProps) {
  const classes = useStyles();
  const vehicleMenu = (
    <Menu
      onClick={props.updateModule}
      style={{
        background: "white",
        color: "black"
      }}
    >
      <Menu.Item key={"service"} icon={<Service width='20' height='20' />}>
        <Typography.Text strong style={{ color: "#000000", marginLeft: "10%" }}>
          Service Bookings (21)
        </Typography.Text>
      </Menu.Item>
      <Menu.Item key={"issues"} icon={<Issues width='25' height='25' />}>
        <Typography.Text strong style={{ color: "#000000", marginLeft: "10%" }}>
          Customer Issues (11)
        </Typography.Text>
      </Menu.Item>
      <Menu.Item key={"rsa"} icon={<RSA width='20' height='20' />}>
        <Typography.Text strong style={{ color: "#000000", marginLeft: "10%" }}>
          RSA Requests (1)
        </Typography.Text>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={vehicleMenu}
      trigger={["click"]}
      overlayStyle={{
        width: "250px",
        background: "white",
      }}
    >
      <div
        // className={`connectM-dropDown connectM-dropdown-active}`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <Vehicle
          fill='green'
          style={{ marginLeft: "5px" }}
          width='60px'
          height='24px'
          className={`dropdown-svg-fill`}
        /> */}
        {getModuleIcon(props.module)}
        <div className={"pair"}>
          {/* <Typography.Text className={`dropdown-typography typography-active`}>
            {getModuleName(props.module)}
          </Typography.Text> */}
          <DownOutlined className={"flip"} style={{ marginLeft: "12px" }} />
        </div>
      </div>
    </Dropdown>
  );
}

// export default ModuleFilter;
