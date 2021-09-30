import {
  CopyOutlined,
  HeartOutlined,
  LoadingOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Spin, Avatar } from "antd";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "../../common/InfiniteScroll";
import ChatBubble from "../../common/ChatBubble";
import { ConversationWrapper, LoadMoreWrapper } from "./styles";
import axios from "axios";
import { getLoggedInUser } from "../../../utils/auth";
import { useParams } from "react-router-dom";
import MessageContent from "./MessageContent";
import SpotifyMiniPlayer from "../../common/SpotifyMiniPlayer";
import { rEmit } from "../../../utils/socket";

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
  setLoadError,
}) {
  const messagesRef = useRef([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        .get("/messages/getMessages", {
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
          setLoading(false);
          if (messagesRef.current.length === 0) setLoadError(true);
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

  const getMessagePosition = (
    message,
    index,
    hasTailMessage,
    isTailMessage
  ) => {
    const prevMsg = messages[index - 1] ? messages[index - 1] : {};
    const nextMsg = messages[index + 1] ? messages[index + 1] : {};

    let position = null;

    if (
      prevMsg.sender === message.sender &&
      nextMsg.sender === message.sender
    ) {
      position = "middle";
    } else if (
      prevMsg.sender === message.sender &&
      nextMsg.sender !== message.sender
    ) {
      position = "last";
    } else if (
      prevMsg.sender !== message.sender &&
      nextMsg.sender === message.sender
    ) {
      position = "first";
    } else if (
      prevMsg.sender !== message.sender &&
      nextMsg.sender !== message.sender
    ) {
      position = "only";
    }

    if (hasTailMessage) {
      if (position === "last") {
        position = "middle";
      }

      if (position === "only") {
        position = "first";
      }
    }

    if (isTailMessage) {
      if (position === "first") {
        position = "middle";
      }

      if (position === "only") {
        position = "last";
      }
    }

    return position;
  };

  const isLastReadMessage = (m) => {
    let lastReadMessage = threadInfo.seen_status.find(
      (s) => s.user_id !== user._id
    ).last_read_message_id;

    return lastReadMessage === m._id;
  };

  const isSpotifyTrack = (message) =>
    message.includes("https://open.spotify.com/track/");

  const getUrlFromText = (text) => {
    // eslint-disable-next-line
    let urls = text.match(/(https?\:\/\/)?([^\.\s]+)?[^\.\s]+\.[^\s]+/gi);
    let url = "";

    if (Array.isArray(urls)) url = urls[0];
    return url;
  };

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }

  function copyMessage(message) {
    if (!message.content) return;

    let text = message.content;

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  const updateLike = (message, liked) => {
    const status = liked === true ? "like" : "unlike";
    console.log("updating like status...");
    let likePayload = {
      thread_id: threadId,
      liked_message_id: message._id,
      status: status,
    };

    setMessages(
      messagesRef.current.map((m) => {
        if (m._id === message._id && Array.isArray(m.liked_by)) {
          const message = { ...m };
          if (status === "like") {
            console.log(message.liked_by)
            message.liked_by.push(user._id);
            console.log(message.liked_by)
          } else {
            message.liked_by = message.liked_by.filter((u) => u !== user._id);
          }
          return message;
        } else return m;
      })
    );
    rEmit("_updateMessageLike", likePayload);
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
        {messages.map((message, index) => {
          const liked =
            Array.isArray(message.liked_by) &&
            message.liked_by.includes(user._id);
          return (
            <div key={message._id}>
              <ChatBubble
                type={message.sender === user._id ? "mine" : "other"}
                ghost={isOnlyEmojis(message.content)}
                tight={
                  isOnlyEmojis(message.content) || message.type === "image"
                }
                textSize={isOnlyEmojis(message.content) ? "xx-large" : "small"}
                position={getMessagePosition(
                  message,
                  index,
                  message.type === "text" && isSpotifyTrack(message.content)
                )}
                recipientInfo={recipientInfo}
                dimmed={!message._id ? true : false}
                timestamp={message.date_created}
                actions={[
                  {
                    name: "Copy",
                    icon: <CopyOutlined />,
                    action: () => copyMessage(message),
                  },
                  {
                    name: "Like",
                    icon: <HeartOutlined />,
                    action: () => updateLike(message, !liked),
                    active: liked,
                    disabled: false,
                  },
                  {
                    name: "Reply",
                    icon: <RollbackOutlined />,
                    action: () => null,
                    disabled: true,
                  },
                ]}
                shouldUseClickAction={message.type === "text"}
              >
                <MessageContent message={message} />
              </ChatBubble>
              {message.type === "text" && isSpotifyTrack(message.content) && (
                <ChatBubble
                  type={message.sender === user._id ? "mine" : "other"}
                  tight={true}
                  position={getMessagePosition(message, index, false, true)}
                  dimmed={!message._id ? true : false}
                  timestamp={message.date_created}
                >
                  <SpotifyMiniPlayer url={getUrlFromText(message.content)} />
                </ChatBubble>
              )}
              {isLastReadMessage(message) && (
                <div className="recipient-indicator">
                  <Avatar
                    className="seen-avatar"
                    src={recipientInfo.display_picture}
                    size={18}
                  />
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
          );
        })}
      </ConversationWrapper>
    </InfiniteScroll>
  );
}
