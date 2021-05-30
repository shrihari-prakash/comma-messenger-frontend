import { Avatar, Skeleton } from "antd";
import axios from "axios";
import { List } from "rc-field-form";
import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { getLoggedInUser } from "../../utils/auth";
import PageHeader from "../common/PageHeader";
import ChatActions from "./ChatActions";
import ConversationView from "./ConversationView";
import { HeaderUserWrapper, SplitsWrapper } from "./styles";

const MESSAGES = "MESSAGES";
const LOCK = "LOCK";
const LOADER = "LOADER";

export default function Splits() {
  const history = useHistory();
  const { threadId } = useParams();
  const user = getLoggedInUser();

  const [contentView, setContentView] = useState(MESSAGES);
  const [threadInfo, setThreadInfo] = useState(null);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [splitList, setSplitList] = useState(null);
  const [activeSplit, setActiveSplit] = useState(null);
  useEffect(() => {
    setShowSplitMessages(false);
    setTimeout(() => {
      setShowSplitMessages(true);
    }, 1);
  }, [activeSplit]);
  const [showSplitMessages, setShowSplitMessages] = useState(true);
  const contentRef = useRef();

  useEffect(() => {
    axios
      .get("/rest/v1/threads/getThreadInfo", {
        params: {
          thread_id: threadId,
        },
      })
      .then((result) => {
        if (result.data.status === 200) {
          const thread = result.data.result;
          setThreadInfo(thread);
          const otherUser = thread.thread_participants.find(
            (p) => p._id !== user._id
          );
          setRecipientInfo(otherUser);
          setSplitList(thread.tabs);
        }
      });
  }, []);

  const onBack = () => history.push("/conversations");

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
            recipientInfo.name.givenName + " " + recipientInfo.name.familyName
          ) : (
            <Skeleton.Button
              style={{ width: 150 }}
              active
              size="small"
              shape="round"
            />
          )}
        </HeaderUserWrapper>
        <div class="dummy"></div>
      </PageHeader>
      <div class="content" ref={contentRef}>
        {contentView === MESSAGES && activeSplit && showSplitMessages && (
          <ConversationView
            contentRef={contentRef}
            recipientInfo={recipientInfo}
            activeSplit={activeSplit}
          ></ConversationView>
        )}
      </div>
      <ChatActions
        splits={splitList}
        activeSplit={activeSplit}
        onSplitChange={setActiveSplit}
      ></ChatActions>
    </SplitsWrapper>
  );
}
