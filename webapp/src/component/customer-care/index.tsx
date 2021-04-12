import "./index.scss";
import React, { PureComponent, useState } from "react";
import DropDownFilter from "./components/dropdown-filter";
import ModuleFilter from "./components/module-filter";
import Table from "./components/table/index";
import GroupedDropDownFilter from "./components/grouped-dropdown-filter";
import { makeStyles } from "@material-ui/core/styles";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
  },
});
interface CustomerCareProps {}

interface CustomerCareStates {}
function getDropdownOption(key: string) {
  switch (key) {
    case "service":
      return (
        <React.Fragment>
          <GroupedDropDownFilter
            defaultFilter1={"Vehicle Type"}
            dropDownOptions1={["Cargo", "Classic"]}
            onClick1={(e) => {
              console.log("click click", e.key);
            }}
            defaultFilter2={"Location"}
            dropDownOptions2={["Kolkata", "Delhi"]}
            onClick2={(e) => {
              console.log("click click", e.key);
            }}
          />
          <GroupedDropDownFilter
            defaultFilter1={"Booked For"}
            dropDownOptions1={["Today", "This Week", "This Month"]}
            onClick1={(e) => {
              console.log("click click", e.key);
            }}
            defaultFilter2={"Slot"}
            dropDownOptions2={["Kolkata", "Delhi"]}
            onClick2={(e) => {
              console.log("click click", e.key);
            }}
          />
          <DropDownFilter
            defaultFilter={"Status"}
            dropDownOptions={["Open", "Closed", "Cancelled"]}
            onClick={(e) => {
              console.log("click click", e.key);
            }}
          />
        </React.Fragment>
      );
    case "issues":
      return (
        <React.Fragment>
          <GroupedDropDownFilter
            defaultFilter1={"City"}
            dropDownOptions1={["Kolkata", "Delhi"]}
            onClick1={(e) => {
              console.log("click click", e.key);
            }}
            defaultFilter2={"Vehicle Type"}
            dropDownOptions2={["Cargo", "Classic"]}
            onClick2={(e) => {
              console.log("click click", e.key);
            }}
          />
          <GroupedDropDownFilter
            defaultFilter1={"Date"}
            dropDownOptions1={["Today", "This Week", "This Month"]}
            onClick1={(e) => {
              console.log("click click", e.key);
            }}
            defaultFilter2={"Category"}
            dropDownOptions2={["Kolkata", "Delhi"]}
            onClick2={(e) => {
              console.log("click click", e.key);
            }}
          />
          <DropDownFilter
            defaultFilter={"Status"}
            dropDownOptions={["Open", "Closed", "Cancelled"]}
            onClick={(e) => {
              console.log("click click", e.key);
            }}
          />
        </React.Fragment>
      );
    case "rsa":
      return (
        <React.Fragment>
          <DropDownFilter
            defaultFilter={"Location"}
            dropDownOptions={["Open", "Closed", "Cancelled"]}
            onClick={(e) => {
              console.log("click click", e.key);
            }}
          />
          <DropDownFilter
            defaultFilter={"Date"}
            dropDownOptions={["Open", "Closed", "Cancelled"]}
            onClick={(e) => {
              console.log("click click", e.key);
            }}
          />
          <DropDownFilter
            defaultFilter={"Status"}
            dropDownOptions={["Open", "Closed", "Cancelled"]}
            onClick={(e) => {
              console.log("click click", e.key);
            }}
          />
        </React.Fragment>
      );
    default:
      break;
  }
}

function CustomerCare(props: CustomerCareProps) {
  const classes = useStyles();
  const [searchText, updateSearchText] = useState("");
  const [module, changeModule] = useState("service");
  console.log(module);

  return (
    <div className='container-lg customer-care' style={{ paddingTop: 20 }}>
      <div className={classes.root}>
        <ModuleFilter
          updateModule={(e: any) => changeModule(e.key)}
          module={module}
        />
        <div className={classes.filterContainer}>
          {getDropdownOption(module)}
        </div>
        <div
          className={"search-background-color-active"}
          style={{ width: "200px", borderRadius: 4 }}
        >
          <AutoComplete
            style={{
              width: "100%",
              borderColor: "white",
            }}
            options={[]}
            dropdownClassName='autocomplete-module-dropdown'
            // onSelect={}
            backfill={true}
            value={searchText}
            // notFoundContent={"no option available"}
            children={
              <Input
                size='large'
                onChange={(e) => {
                  updateSearchText(e.target.value);
                }}
                className={`${
                  searchText.length > 0
                    ? "search-module-color-active"
                    : "search-module-color"
                }`}
                value={searchText}
                placeholder='Search'
                style={{ textAlign: "left", borderColor: "white" }}
                prefix={<SearchOutlined style={{ color: "red" }} />}
              />
            }
          />
        </div>
      </div>
      <div
        style={{
          height: "100%",
        }}
      >
        <Table module={module} />
      </div>
    </div>
  );
}
export default CustomerCare;

// export default CustomerCare;
