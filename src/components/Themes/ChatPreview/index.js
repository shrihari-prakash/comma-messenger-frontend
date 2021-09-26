import React from "react";
import ChatBubble from "../../common/ChatBubble";
import MessageContent from "../../Splits/ConversationView/MessageContent";
import { ConversationWrapper } from "../../Splits/ConversationView/styles";
import { ChatPreviewWrapper } from "./styles";
import defaultDp from "../../../assets/images/default-display-picture.png";

export default function ChatPreview() {
  const recipientInfo = {
    display_picture: defaultDp,
  };
  return (
    <ChatPreviewWrapper>
      <ConversationWrapper>
        <ChatBubble type="mine" position="only" actions={[]}>
          <MessageContent message={{ type: "text", content: "Hello!" }} />
        </ChatBubble>
        <ChatBubble
          type="other"
          position="first"
          actions={[]}
          recipientInfo={recipientInfo}
        >
          <MessageContent message={{ type: "text", content: "Hey There!" }} />
        </ChatBubble>
        <ChatBubble
          type="other"
          position="last"
          actions={[]}
          recipientInfo={recipientInfo}
        >
          <MessageContent
            message={{ type: "text", content: "Are you in today?" }}
          />
        </ChatBubble>
      </ConversationWrapper>
    </ChatPreviewWrapper>
  );
}
