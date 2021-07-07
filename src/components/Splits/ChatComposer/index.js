import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { ActionButton } from "../../common/ActionButton/styles";
import { StyledTextArea } from "../../common/TextArea/styles";
import { ChatComposerWrapper } from "./styles";
import { useParams } from "react-router-dom";
import { rEmit } from "../../../utils/socket";

const TEXT = "TEXT";
const IMAGE = "IMAGE";

var timeout = undefined;

export default function ChatComposer({ contentRef, sendMessage }) {
  const [composeMode, setComposeMode] = useState(IMAGE);
  const [typing, setTyping] = useState(false);
  const [composedMessage, setComposedMessage] = useState("");

  const inputRef = useRef();

  const { threadId } = useParams();

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const updateComposedMessage = (event) => {
    let composed = event.target.value;
    setComposedMessage(composed);
  };

  const onTextChange = (e) => {
    let composed = e.target.value;
    updateComposedMessage(e);

    isEmptyOrSpaces(composed) ? setComposeMode(IMAGE) : setComposeMode(TEXT);
  };

  const isScrolledToBottom = (e) =>
    e.scrollHeight - e.scrollTop - e.clientHeight <= 500;

  const scrollToBottom = () => {
    if (isScrolledToBottom(contentRef.current)) {
      setTimeout(
        () => (contentRef.current.scrollTop = contentRef.current.scrollHeight),
        100
      );
    }
  };

  const emitTyping = (boolean) => {
    let typingObject = {
      thread_id: threadId,
      status: boolean,
    };

    rEmit("_updateTypingStatus", typingObject);
  };

  function timeoutFunction() {
    setTyping(false);
    emitTyping(false);
    console.log("stopped typing.");
  }

  function onKeyDownNotEnter() {
    if (typing === false) {
      setTyping(true);
      emitTyping(true);
      console.log("typing...");
      timeout = setTimeout(timeoutFunction, 2000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 2000);
    }
  }

  const send = (e) => {
    console.log("send triggered", composedMessage);
    if (!isEmptyOrSpaces(composedMessage)) {
      sendMessage(composedMessage, setComposedMessage);
      inputRef.current.focus();
    }
  };

  return (
    <ChatComposerWrapper>
      <StyledTextArea
        autoSize={{ minRows: 1, maxRows: 10 }}
        size="large"
        placeholder="Type something..."
        onChange={onTextChange}
        onFocus={scrollToBottom}
        onKeyDown={onKeyDownNotEnter}
        ref={inputRef}
        value={composedMessage}
      ></StyledTextArea>
      {composeMode === TEXT ? (
        <ActionButton onClick={send}>
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
