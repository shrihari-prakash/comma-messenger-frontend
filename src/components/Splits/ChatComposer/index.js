import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { ActionButton } from "../../common/ActionButton/styles";
import { StyledTextArea } from "../../common/TextArea/styles";
import { ChatComposerWrapper } from "./styles";

const TEXT = "TEXT";
const IMAGE = "IMAGE";

export default function ChatComposer() {
  const [composeMode, setComposeMode] = useState(IMAGE);
  const message = useRef();

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const onTextChange = (e) => {
    let composed = e.target.value;
    message.current = composed;

    isEmptyOrSpaces(composed) ? setComposeMode(IMAGE) : setComposeMode(TEXT);
  };

  return (
    <ChatComposerWrapper>
      <StyledTextArea
        autoSize={{ minRows: 1, maxRows: 10 }}
        size="large"
        placeholder="Type something..."
        onChange={onTextChange}
      ></StyledTextArea>
      {composeMode === TEXT ? (
        <ActionButton>
          <SendOutlined />
        </ActionButton>
      ) : (
        <ActionButton>
          <PictureOutlined />
        </ActionButton>
      )}
    </ChatComposerWrapper>
  );
}
