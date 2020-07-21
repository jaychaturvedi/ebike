import * as React from "react";
import { DownOutlined } from "@ant-design/icons";

interface HeaderProps {
    name: string
    className: string,
    isClicked?: boolean,
    clickFunction?: () => void;
}
//todo convert functional header component in class based
export const Header: React.FC<HeaderProps> =
    ({ name, className, isClicked, clickFunction }) => (
        <div className="ant-table-cell" onClick={clickFunction} > {name}
            <span id={name}><DownOutlined className={className} /></span>
        </div>
    )