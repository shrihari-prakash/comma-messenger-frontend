import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { ActionButton } from "../../common/ActionButton/styles";
import { StyledTextArea } from "../../common/TextArea/styles";
import { ChatComposerWrapper } from "./styles";
import { useParams } from "react-router-dom";
import { rEmit } from "../../../utils/socket";
import ImageUploader from "./ImageUploader";

const TEXT = "TEXT";
const IMAGE = "IMAGE";

var timeout = undefined;

export default function ChatComposer({ sendMessage, sendImages }) {
  const [composeMode, setComposeMode] = useState(IMAGE);
  const [typing, setTyping] = useState(false);
  const [composedMessage, setComposedMessage] = useState("");
  const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);

  const inputRef = useRef();

  const { threadId } = useParams();

  const isEmptyOrSpaces = (str) => str === null || str.match(/^ *$/) !== null;

  const updateComposedMessage = (event) => {
    let composed = event.target.value;
    setComposedMessage(composed);
  };

  const onTextChange = (e) => {
    let composed = e.target.value;
    updateComposedMessage(e);
    isEmptyOrSpaces(composed) ? setComposeMode(IMAGE) : setComposeMode(TEXT);
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
  }

  function onKeyDownNotEnter() {
    if (typing === false) {
      setTyping(true);
      emitTyping(true);
      timeout = setTimeout(timeoutFunction, 2000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 2000);
    }
  }

  const send = (e) => {
    if (isEmptyOrSpaces(composedMessage)) return;
    sendMessage(composedMessage, setComposedMessage);
    inputRef.current.focus();
    setComposeMode(IMAGE);
  };

  const openImageUploader = () => setIsImageUploadVisible(true);

  return (
    <ChatComposerWrapper>
      <StyledTextArea
        autoSize={{ minRows: 1, maxRows: 10 }}
        size="large"
        placeholder="Type something..."
        onChange={onTextChange}
        onKeyDown={onKeyDownNotEnter}
        ref={inputRef}
        value={composedMessage}
      ></StyledTextArea>
      {composeMode === TEXT ? (
        <ActionButton onClick={send}>
          <SendOutlined />
        </ActionButton>
      ) : (
        <ActionButton onClick={openImageUploader}>
          <PictureOutlined />
        </ActionButton>
      )}
      <ImageUploader
        isImageUploadVisible={isImageUploadVisible}
        setIsImageUploadVisible={setIsImageUploadVisible}
        sendImages={sendImages}
      />
    </ChatComposerWrapper>
  );
}
