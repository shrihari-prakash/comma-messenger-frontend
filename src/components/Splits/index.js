import { Avatar, Skeleton } from "antd";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import socket from "../../WebSocket";
import { getLoggedInUser } from "../../utils/auth";
import PageHeader from "../common/PageHeader";
import ChatActions from "./ChatActions";
import ConversationView from "./ConversationView";
import { HeaderUserWrapper, SplitsWrapper } from "./styles";
import { rEmit } from "../../utils/socket";
import DataError from "../common/DataError";

export default function Splits() {
  const history = useHistory();

  const [threadInfo, setThreadInfo] = useState(null);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const messagesRef = useRef();
  const contentRef = useRef();
  const messageQueue = useRef([]);
  const user = getLoggedInUser();
  const isMessagesLoadingRef = useRef();
  const threadInfoRef = useRef();

  const { threadId } = useParams();

  useEffect(() => (messagesRef.current = messages), [messages]);

  useEffect(
    () => (isMessagesLoadingRef.current = isMessagesLoading),
    [isMessagesLoading]
  );

  useEffect(() => (threadInfoRef.current = threadInfo), [threadInfo]);

  const addMessageToState = (message) => {
    if (message.thread_id !== threadId) return;

    console.log("isMessageListLoading", isMessagesLoadingRef);
    if (isMessagesLoadingRef.current === true) {
      messageQueue.current.push(message);
      console.log(
        "add to state deferred for " + message._id + " due to message load."
      );
      return;
    }

    let isAlreadyAdded = messages.find((msg) => msg._id === message._id);

    if (!isAlreadyAdded) {
      message.animate_entrance = true;
      setMessages((messages) => [...messages, message]);
      updateSeen(message._id);

      if (message.sender !== user._id) {
        setOtherUserMessageSeen({
          last_read_message_id: message._id,
          thread_id: threadId,
        });
      }

      window.navigator.vibrate(50); // vibrate for 50ms

      //If the user is having the conversation scrolled to almost at the bottom, scroll the div to it's bottom to show the
      //new message.
      scrollToBottom();
    }
  };

  const processStateMessageQueue = () => {
    console.log(
      "processing message queue...",
      "message loading has been set to",
      isMessagesLoading
    );
    messageQueue.current.forEach((queueItem, index) => {
      messageQueue.current.splice(index, 1);
      addMessageToState(queueItem);
    });
  };

  const checkForNewMessages = () => {
    if (document.visibilityState === "hidden") return;

    console.log("checking for new messages...");
    axios
      .get("/messages/getMessages", {
        params: {
          thread_id: threadId,
          limit: 10,
          offset: 0,
        },
      })
      .then((result) => {
        if (result.data.status === 200) {
          let messages = result.data.result.messages;
          messages = messages.reverse();
          setMessages((msgs) => {
            var ids = new Set(msgs.map((d) => d._id));
            let merged = [...msgs, ...messages.filter((d) => !ids.has(d._id))];
            return merged;
          });
        }
      })
      .catch((e) => {
        console.error("Error loading messages:", e);
      });
  };

  const updateSeen = (messageId) => {
    if (document.visibilityState === "hidden") return;

    if (messagesRef.current.length === 0) return;

    if (!messageId || typeof messageId === "object")
      messageId = messagesRef.current[messagesRef.current.length - 1]._id;

    console.log("updating seen status...");
    let seenStatus = {
      thread_id: threadId,
      last_read_message_id: messageId,
    };
    rEmit("_updateMessageSeen", seenStatus);
  };

  const setOtherUserMessageSeen = (payload) => {
    if (payload.thread_id !== threadId) return;

    let ti = { ...threadInfoRef.current };
    ti.seen_status.forEach((seenObject, index) => {
      if (seenObject.user_id !== user._id) {
        ti.seen_status[index].last_read_message_id =
          payload.last_read_message_id;
      }
    });

    setThreadInfo(() => ti);
  };

  const setMessageLike = (payload) => {
    if (payload.thread_id !== threadId) return;
    const status = payload.status;

    setMessages(
      messagesRef.current.map((m) => {
        if (m._id === payload.liked_message_id && Array.isArray(m.liked_by)) {
          const message = { ...m };
          const thread = { ...threadInfoRef.current };
          const otherUserId = thread.thread_participants.find(
            (uId) => uId !== user._id
          );
          if (status === "like") {
            message.liked_by.push(otherUserId);
          } else {
            message.liked_by = message.liked_by.filter(
              (u) => u !== otherUserId
            );
          }
          return message;
        } else return m;
      })
    );
  };

  const setTypingStatus = (payload) => {
    if (payload.thread_id === threadId) setIsTyping(payload.status);
  };

  const processMessageOutSuccess = (successMessage) => {
    let stateMessage, sentMessage;
    let refArray = messagesRef.current;

    switch (successMessage.type) {
      case "text":
        let messagesCopy = [...refArray];

        for (let index = 0; index < messagesCopy.length; index++) {
          const currentMessage = messagesCopy[index];
          if (currentMessage.id === successMessage.message_id) {
            currentMessage._id = successMessage.inserted_id;
            break;
          }
        }
        setMessages(() => messagesCopy);
        updateSeen(successMessage.inserted_id);
        break;

      case "image":
        stateMessage = {
          date_created: new Date(successMessage.message_id * 1000),
          sender: user._id,
          type: "image",
          file_name: "",
          _id: successMessage.inserted_id,
        };
        sentMessage = messageQueue.current.find((queueItem) => {
          console.log(queueItem);
          return queueItem.id === successMessage.message_id;
        });
        console.log(sentMessage);
        stateMessage.file_name = sentMessage.file_name;

        setMessages((messages) => [...messages, stateMessage]);
        updateSeen(stateMessage._id);
        break;

      default:
        break;
    }
    scrollToBottom();

    messageQueue.current = messageQueue.current.filter((queueItem) => {
      return queueItem.id !== successMessage.message_id;
    });
  };

  const successHandler = (successMessage) => {
    console.log("success message", successMessage);
    switch (successMessage.event) {
      case "_messageOut":
        processMessageOutSuccess(successMessage);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (isMessagesLoading === false) processStateMessageQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMessagesLoading]);

  useEffect(() => {
    socket.on("_messageIn", addMessageToState);
    socket.on("_messageSeen", setOtherUserMessageSeen);
    socket.on("_messageLike", setMessageLike);
    socket.on("_typingStatus", setTypingStatus);
    socket.on("_success", successHandler);
    socket.on("_connect", checkForNewMessages);

    document.addEventListener("visibilitychange", updateSeen);
    document.addEventListener("visibilitychange", checkForNewMessages);

    return () => {
      socket.off("_messageIn", addMessageToState);
      socket.off("_messageSeen", setOtherUserMessageSeen);
      socket.off("_messageLike", setMessageLike);
      socket.off("_typingStatus", setTypingStatus);
      socket.off("_success", successHandler);
      socket.off("_connect", checkForNewMessages);

      document.removeEventListener("visibilitychange", updateSeen);
      document.removeEventListener("visibilitychange", checkForNewMessages);
    };
  });

  const onBack = () => history.push("/conversations");

  const isScrolledToBottom = (e, t) =>
    e.scrollHeight - e.scrollTop - e.clientHeight <= t;

  const scrollToBottom = () => {
    if (isScrolledToBottom(contentRef.current, 1000)) {
      setTimeout(
        () => (contentRef.current.scrollTop = contentRef.current.scrollHeight),
        10
      );
    }
  };

  useEffect(() => {
    if ("visualViewport" in window) {
      window.visualViewport.addEventListener("resize", scrollToBottom);
    }

    return () =>
      window.visualViewport.removeEventListener("resize", scrollToBottom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (composedMessage, setComposedMessage) => {
    let messageObject = {
      id: +new Date(),
      type: "text",
      date_created: new Date(),
      thread_id: threadId,
      content: composedMessage,
      liked_by: [],
      animate_entrance: true,
    };
    messageQueue.current.push(messageObject);
    rEmit("_messageOut", messageObject);
    messageObject.sender = user._id;
    setMessages((messages) => [...messages, messageObject]);
    setComposedMessage("");
    scrollToBottom();
  };

  const sendImages = (fileNames) => {
    fileNames.forEach((fileName) => {
      let messageObject = {
        id: +new Date(),
        type: "image",
        date_created: new Date(),
        thread_id: threadId,
        file_name: fileName,
      };
      messageQueue.current.push(messageObject);
      rEmit("_messageOut", messageObject);
    });
  };

  if (loadError)
    return (
      <SplitsWrapper>
        <DataError />
      </SplitsWrapper>
    );

  return (
    <SplitsWrapper>
      <PageHeader onBack={onBack}>
        <HeaderUserWrapper>
          <Avatar
            src={
              recipientInfo ? (
                recipientInfo.display_picture
              ) : (
                <Skeleton.Avatar active />
              )
            }
          />
          {recipientInfo ? (
            <span className="user-name">
              {recipientInfo.name.givenName +
                " " +
                recipientInfo.name.familyName}
            </span>
          ) : (
            <Skeleton.Button
              style={{ width: 150 }}
              active
              size="small"
              shape="round"
            />
          )}
        </HeaderUserWrapper>
        <div className="dummy"></div>
      </PageHeader>
      <div className="content" ref={contentRef}>
        <ConversationView
          contentRef={contentRef}
          recipientInfo={recipientInfo}
          setRecipientInfo={setRecipientInfo}
          threadInfo={threadInfo}
          setThreadInfo={setThreadInfo}
          messages={messages}
          setMessages={setMessages}
          isMessagesLoading={isMessagesLoading}
          setIsMessagesLoading={setIsMessagesLoading}
          isTyping={isTyping}
          setLoadError={setLoadError}
        ></ConversationView>
      </div>
      <ChatActions
        contentRef={contentRef}
        sendMessage={sendMessage}
        sendImages={sendImages}
      />
    </SplitsWrapper>
  );
}
