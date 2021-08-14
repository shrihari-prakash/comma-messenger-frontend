import { WarningOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { DataErrorWrapper } from "./styles";

export default function DataError() {
  return (
    <DataErrorWrapper>
      <div>
        <WarningOutlined /> There was a problem loading data. Please check your
        network. If your network is working fine, try restarting the appliation.
      </div>
      <div className="refresh-button">
        <Button onClick={() => window.location.reload()}>Restart</Button>
      </div>
    </DataErrorWrapper>
  );
}
