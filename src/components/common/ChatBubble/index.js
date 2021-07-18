import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { ChatBubbleWrapper } from "./styles";

export default function ChatBubble({
  type = "mine",
  position = "only",
  ghost = false,
  textSize,
  tight = false,
  children,
  recipientInfo,
  dimmed,
}) {
  return (
    <ChatBubbleWrapper
      type={type}
      position={position}
      ghost={ghost}
      textSize={textSize || "small"}
      tight={tight}
      dimmed={dimmed}
    >
      {type === "other" && (position === "first" || position === "only") && (
        <div className="avatar">
          <Avatar src={recipientInfo ? recipientInfo.display_picture : ""} />
        </div>
      )}
      {type === "other" && position !== "first" && position !== "only" && (
        <div className="additional-margin"></div>
      )}
      <div className="bubble">{children}</div>
    </ChatBubbleWrapper>
  );
}
