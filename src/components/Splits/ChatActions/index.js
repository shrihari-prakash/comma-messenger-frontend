import React from "react";
import ChatComposer from "../ChatComposer";
import { ChatActionsWrapper } from "./styles";

export default function ChatActions({ contentRef, sendMessage, sendImages }) {
  return (
    <ChatActionsWrapper>
      <ChatComposer
        contentRef={contentRef}
        sendMessage={sendMessage}
        sendImages={sendImages}
      ></ChatComposer>
    </ChatActionsWrapper>
  );
}
