import React from "react";
import ChatComposer from "../ChatComposer";
import { ChatActionsWrapper } from "./styles";

export default function ChatActions({ contentRef, sendMessage }) {
  return (
    <ChatActionsWrapper>
      <ChatComposer
        contentRef={contentRef}
        sendMessage={sendMessage}
      ></ChatComposer>
    </ChatActionsWrapper>
  );
}
