import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React, { useState } from "react";
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
  timestamp,
}) {
  const [showTime, setShowTime] = useState(false);
  const toggleShowTime = () => setShowTime(!showTime);

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
      <div className="bubble" onClick={toggleShowTime}>
        {children}
      </div>
      {showTime && (
        <div className="timestamp">
          {type === "other" && <div className="additional-margin"></div>}
          {moment(timestamp).format("MMM Do YY, h:mm A")}
        </div>
      )}
    </ChatBubbleWrapper>
  );
}
