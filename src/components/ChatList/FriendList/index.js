import React, { useEffect, useRef, useState } from "react";
import { FriendListWrapper } from "./styles";
import { Avatar, Spin, Skeleton, Badge } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import { StyledList } from "../../common/List/styles";
import { useHistory } from "react-router";
import { getLoggedInUser } from "../../../utils/auth";
import axios from "axios";
import moment from "moment";
import socket from "../../../WebSocket";
import routes from "../../../utils/routes";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

//For sorting conversations array efficiently.
//Code copied from: https://stackoverflow.com/a/10124053/12466812
(function () {
  if (typeof Object.defineProperty === "function") {
    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Array.prototype, "sortBy", { value: sb });
    } catch (e) {}
  }
  // eslint-disable-next-line no-extend-native
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f) {
    for (let i = this.length; i; ) {
      var o = this[--i];
      this[i] = [].concat(f.call(o, o, i), o);
    }
    this.sort(function (a, b) {
      for (var i = 0, len = a.length; i < len; ++i) {
        if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
      }
      return 0;
    });
    for (let i = this.length; i; ) {
      this[--i] = this[i][this[i].length - 1];
    }
    return this;
  }
})();

function truncateText(text, length) {
  if (text.length <= length) {
    return text;
  }

  return text.substr(0, length) + "\u2026";
}

export default function FriendList({ setUnreadCount }) {
  const history = useHistory();
  const user = getLoggedInUser();

  const [friendList, setFriendlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const friendListRef = useRef();

  useEffect(() => {
    friendListRef.current = friendList;

    let unreadCount = 0;
    friendList.forEach((e) => {
      if (hasNewMessage(e)) unreadCount = unreadCount + 1;
    });
    setUnreadCount(unreadCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendList]);

  const getThreads = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("/rest/v1/threads/getThreads", {
          params: {
            limit: 25,
            offset: friendList.length,
          },
        })
        .then((result) => {
          if (result.data.status === 200) {
            let threads = result.data.result;
            resolve(threads);
          }
        });
    });
  };

  const updateConversations = async () => {
    if (document.visibilityState === "hidden") return;

    console.log("checking for new threads...");
    let newThreads = await getThreads();

    setFriendlist((currentThreads) => {
      var ids = new Set(currentThreads.map((d) => d._id));
      let merged = [
        ...currentThreads,
        ...newThreads.filter((d) => !ids.has(d._id)),
      ];
      return merged;
    });
  };

  const markNewConversation = (message) => {
    console.log(
      "incoming message... current state list:",
      friendListRef.current
    );
    let friendListCopy = friendListRef.current.slice().map((e, index) => {
      if (e._id === message.thread_id) {
        e.date_updated = message.date_created;
        e.new_for.push(user._id);
      }
      return e;
    });

    friendListCopy = friendListCopy.sortBy(function (o) {
      return o.date_updated;
    });
    friendListCopy = friendListCopy.reverse();
    setFriendlist(friendListCopy);
    window.navigator.vibrate(50); // vibrate for 50ms
  };

  useEffect(() => {
    if (user._id === null) return history.push("/");
    socket.on("_messageIn", markNewConversation);
    document.addEventListener("visibilitychange", updateConversations);
    fetchFriends(() => null);

    // returned function will be called on component unmount
    return () => {
      socket.off("_messageIn", markNewConversation);
      document.removeEventListener("visibilitychange", updateConversations);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFriends = (callback) => {
    getThreads().then((threads) => {
      threads.forEach((thread, index) => {
        let allParticipants = thread.thread_participants;
        threads[index].other_user = allParticipants.find((participant) => {
          return participant._id !== user._id;
        });
      });
      setFriendlist((t) => [...t, ...threads]);
      setInitialLoad(false);
      if (threads.length < 25) setHasMore(false);
      return setLoading(false);
    });
  };

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    fetchFriends((res) => null);
  };

  const getThreadContact = (conversation) => {
    const participants = conversation.thread_participants;
    const contactInfo = participants.find((p) => p._id !== user._id);
    return contactInfo;
  };

  const hasNewMessage = (conversation) =>
    conversation.new_for.includes(user._id);

  const getMessagePreview = (conversation) => {
    if (!conversation.message_preview || !conversation.message_preview.content)
      return "No message yet.";
    return truncateText(conversation.message_preview.content, 25);
  };

  return (
    <FriendListWrapper>
      {initialLoad ? (
        <StyledList
          dataSource={Array.from({ length: 15 }, (v, k) => k + 1)}
          renderItem={(item) => (
            <StyledList.Item key={item}>
              <Skeleton
                loading={true}
                active
                avatar
                paragraph={{ rows: 1 }}
              ></Skeleton>
            </StyledList.Item>
          )}
        ></StyledList>
      ) : (
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <StyledList
            dataSource={friendList}
            renderItem={(conversation) => (
              <StyledList.Item
                key={conversation._id}
                onClick={() =>
                  history.push(
                    history.push(`${routes.conversations}/${conversation._id}`)
                  )
                }
              >
                <StyledList.Item.Meta
                  avatar={
                    <Avatar
                      size={50}
                      src={getThreadContact(conversation).display_picture}
                    />
                  }
                  title={
                    <div className="friend-name">
                      {getThreadContact(conversation).name.givenName +
                        " " +
                        getThreadContact(conversation).name.familyName}
                      {hasNewMessage(conversation) && (
                        <div className="new-message-dot">
                          <Badge color="red" />
                        </div>
                      )}
                    </div>
                  }
                  description={
                    <>
                      <span className="message-preview">
                        {getMessagePreview(conversation)}
                      </span>
                      {" - "}
                      {moment(conversation.date_updated).fromNow()}
                    </>
                  }
                />
              </StyledList.Item>
            )}
          >
            {loading && hasMore && (
              <div className="loading-container">
                <Spin indicator={loadingIcon} />
              </div>
            )}
          </StyledList>
        </InfiniteScroll>
      )}
    </FriendListWrapper>
  );
}
