import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Avatar } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "../../common/InfiniteScroll";
import ChatBubble from "../../common/ChatBubble";
import { ConversationWrapper, LoadMoreWrapper } from "./styles";
import axios from "axios";
import { getLoggedInUser } from "../../../utils/auth";
import { useParams } from "react-router-dom";
import MessageContent from "./MessageContent";

export default function ConversationView({
  contentRef,
  recipientInfo,
  setRecipientInfo,
  threadInfo,
  setThreadInfo,
  messages,
  setMessages,
  isMessagesLoading,
  setIsMessagesLoading,
  isTyping,
}) {
  const messagesRef = useRef([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => setIsMessagesLoading(loading), [loading]);

  const { threadId } = useParams();

  const user = getLoggedInUser();

  const updateThreadInfo = (result) => {
    const thread = result.data.result.threadInfo;
    setThreadInfo(thread);
    const otherUser = thread.thread_participants_info.find(
      (p) => p._id !== user._id
    );

    setRecipientInfo(otherUser);
  };

  const handleInfiniteOnLoad = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get("/rest/v1/messages/getMessages", {
          params: {
            thread_id: threadId,
            limit: 25,
            offset: messagesRef.current.length,
          },
        })
        .then((result) => {
          if (result.data.status === 200) {
            if (messagesRef.current.length === 0) updateThreadInfo(result);

            const previousMessages = result.data.result.messages.reverse();
            if (previousMessages.length < 25) setHasMore(false);
            setMessages((messages) => [...previousMessages, ...messages]);
            setLoading(false);
            return resolve(true);
          }
        })
        .catch((e) => {
          console.error("Error loading messages:", e);
          reject(false);
        });
    });
  };

  const loadingIcon = (
    <LoadMoreWrapper>
      <LoadingOutlined style={{ fontSize: 24 }} spin />
    </LoadMoreWrapper>
  );

  const isOnlyEmojis = (text) => {
    const emojiRegex =
      /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
    return emojiRegex.test(text) && text.length <= 40;
  };

  const getMessagePosition = (message, index) => {
    const prevMsg = messages[index - 1] ? messages[index - 1] : {};
    const nextMsg = messages[index + 1] ? messages[index + 1] : {};

    if (
      prevMsg.sender === message.sender &&
      nextMsg.sender === message.sender
    ) {
      return "middle";
    } else if (
      prevMsg.sender === message.sender &&
      nextMsg.sender !== message.sender
    ) {
      return "last";
    } else if (
      prevMsg.sender !== message.sender &&
      nextMsg.sender === message.sender
    ) {
      return "first";
    } else if (
      prevMsg.sender !== message.sender &&
      nextMsg.sender !== message.sender
    ) {
      return "only";
    }
  };

  const isLastReadMessage = (m) => {
    let lastReadMessage = threadInfo.seen_status.find(
      (s) => s.user_id !== user._id
    ).last_read_message_id;

    return lastReadMessage === m._id;
  };

  return (
    <InfiniteScroll
      containerRef={contentRef}
      loadMore={handleInfiniteOnLoad}
      hasMore={hasMore}
    >
      <ConversationWrapper>
        {loading && hasMore ? (
          <div className="loading-container">
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div className="loading-container"></div>
        )}
        {console.log(messages)}
        {messages.map((message, index) => (
          <div key={message._id}>
            <ChatBubble
              type={message.sender === user._id ? "mine" : "other"}
              ghost={isOnlyEmojis(message.content)}
              tight={isOnlyEmojis(message.content) || message.type === "image"}
              textSize={isOnlyEmojis(message.content) ? "xx-large" : "small"}
              position={getMessagePosition(message, index)}
              recipientInfo={recipientInfo}
            >
              <MessageContent message={message} />
            </ChatBubble>
            {isLastReadMessage(message) && (
              <div className="recipient-indicator">
                <Avatar src={recipientInfo.display_picture} size={18} />
                {isTyping && (
                  <div className="typing-container">
                    <div className="tiblock">
                      <div className="tidot"></div>
                      <div className="tidot"></div>
                      <div className="tidot"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </ConversationWrapper>
    </InfiniteScroll>
  );
}
