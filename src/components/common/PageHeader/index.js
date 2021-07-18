import { LeftOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { ActionButton } from "../ActionButton/styles";
import { HeaderSubWrapper, HeaderWrapper } from "./styles";

export default function PageHeader({ onBack = () => null, children }) {
  return (
    <HeaderWrapper>
      <HeaderSubWrapper>
        <Tooltip title="Back" placement="bottom" mouseEnterDelay={2}>
          <ActionButton onClick={onBack}>
            <LeftOutlined />
          </ActionButton>
        </Tooltip>
        {children}
      </HeaderSubWrapper>
    </HeaderWrapper>
  );
}
