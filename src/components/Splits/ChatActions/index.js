import React from "react";
import ChatComposer from "../ChatComposer";
import SplitButtonGroup from "../SplitButtonGroup";
import { ChatActionsWrapper } from "./styles";

export default function ChatActions({ splits, activeSplit, onSplitChange }) {
  return (
    <ChatActionsWrapper>
      <SplitButtonGroup
        splits={splits}
        activeSplit={activeSplit}
        onSplitChange={onSplitChange}
      ></SplitButtonGroup>
      <ChatComposer></ChatComposer>
    </ChatActionsWrapper>
  );
}
