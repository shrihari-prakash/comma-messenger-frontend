import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React, { useState } from "react";
import useSingleAndDoubleClick from "../../../hooks/useSingleAndDoubleClick";
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
  actions = [],
  shouldUseClickAction = false,
  likedAvatar,
  hideOverflow = false,
  shouldAnimate = false,
}) {
  const [showTime, setShowTime] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const toggleShowTime = () => {
    setShowTime(!showTime);
    setShowActions(false);
  };
  const toggleShowActions = () => {
    setShowActions(!showActions);
    setShowTime(false);
  };
  const bubbleClick = useSingleAndDoubleClick(
    toggleShowTime,
    toggleShowActions
  );

  return (
    <ChatBubbleWrapper
      type={type}
      position={position}
      ghost={ghost}
      textSize={textSize || "small"}
      tight={tight}
      dimmed={dimmed}
      hideOverflow={hideOverflow}
      shouldAnimate={shouldAnimate}
    >
      {type === "other" && (position === "first" || position === "only") && (
        <div className="avatar">
          <Avatar src={recipientInfo ? recipientInfo.display_picture : ""} />
        </div>
      )}
      {type === "other" && position !== "first" && position !== "only" && (
        <div className="additional-margin"></div>
      )}
      <div className="bubble-wrap">
        <div
          className="bubble"
          onClick={shouldUseClickAction ? bubbleClick : () => null}
        >
          {children}
          {likedAvatar && <div className="liked-avatar">{likedAvatar}</div>}
        </div>
      </div>
      {showActions && (
        <div className="message-actions">
          {type === "other" && <div className="additional-margin"></div>}
          {actions.map((a) => (
            <div
              className={
                "action-button" +
                (a.disabled ? " disabled" : "") +
                (a.active ? " active" : "")
              }
              onClick={a.action}
            >
              {a.icon}
            </div>
          ))}
        </div>
      )}
      {showTime && (
        <div className="timestamp">
          {type === "other" && <div className="additional-margin"></div>}
          {moment(timestamp).format("MMM Do YY, h:mm A")}
        </div>
      )}
    </ChatBubbleWrapper>
  );
}
