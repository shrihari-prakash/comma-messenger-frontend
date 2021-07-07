import React, { useEffect, useState } from "react";
import { FriendListWrapper } from "./styles";

import { Avatar, Spin, Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import { StyledList } from "../../common/List/styles";
import { useHistory } from "react-router";
import { getLoggedInUser } from "../../../utils/auth";
import axios from "axios";
import moment from "moment";

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function FriendList() {
  const history = useHistory();
  const user = getLoggedInUser();

  const [friendList, setFriendlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    if (user._id === null) return history.push("/");
    /* connectSocket(); */
    /* socket.on("_messageIn", markNewConversation); */
    document.addEventListener("visibilitychange", updateConversations);
    fetchFriends(() => null);
    /* subscribeUser(); */
    // returned function will be called on component unmount
    return () => {
      /* socket.off("_messageIn", markNewConversation); */
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

  /* useEffect(() => {
    setInitialLoad(true);
    fetchFriends((res) => {
      setFriendlist(res.results);
      setInitialLoad(false);
    });
  }, []); */

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
                onClick={() => history.push("/splits/" + conversation._id)}
              >
                <StyledList.Item.Meta
                  avatar={
                    <Avatar
                      size={50}
                      src={getThreadContact(conversation).display_picture}
                    />
                  }
                  title={`${getThreadContact(conversation).name.givenName} ${
                    getThreadContact(conversation).name.familyName
                  }`}
                  description={
                    (hasNewMessage ? "New Messages . " : "") +
                    "Texted " +
                    moment(conversation.date_updated).fromNow()
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
