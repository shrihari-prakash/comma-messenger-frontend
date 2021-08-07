import React, { useState } from "react";
import { Form } from "antd";
import { StyledModal } from "../../common/StyledModal/styles";
import { StyledInput } from "../../common/StyledInput/styles";
import { StyledButton } from "../../common/StyledButton/styles";
import { AddFriendWrapper } from "./styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import routes from "../../../utils/routes";

export default function AddFriend({
  isAddFriendModalVisible,
  setIsAddFriendModalVisible,
}) {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const history = useHistory();

  const handleCancel = () => {
    setIsAddFriendModalVisible(false);
  };

  const sendCreateRequest = (values) => {
    console.log("creating conversation...");
    axios
      .get("/rest/v1/threads/newThread", {
        params: { email: values.email },
      })
      .then(function (result) {
        console.log(result);
        if (result.data.status === 200) {
          let res = result.data.result;
          setIsAddFriendModalVisible(false);
          history.push(`${routes.conversations}/${res._id}`);
        }
      })
      .catch(function (error) {
        console.log(error.response);
        let apiError = error.response.data;
        if (apiError.status === 400) {
          console.log("400", apiError.error);
          switch (apiError.error) {
            case "DUPLICATE_ENTITY":
              setIsError(true);
              setErrorText("You already have a coversation with this person.");
              break;
            case "SELF_ADD":
              setIsError(true);
              setErrorText(
                "There are better apps to take notes. :) Get Google Keep."
              );
              break;
            default:
            // code block
          }
        } else if (apiError.status === 404) {
          setIsError(true);
          setErrorText(
            "We couldn't find the person you tried to add. Can you double check the email address?"
          );
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledModal
      title="Add Friend"
      visible={isAddFriendModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <AddFriendWrapper>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={sendCreateRequest}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            type="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail",
              },
            ]}
          >
            <StyledInput size="large" placeholder="Google ID"></StyledInput>
          </Form.Item>
          {isError && <div className="error-text">{errorText}</div>}
          <div className="footer">
            <StyledButton htmlType="submit">Add</StyledButton>
          </div>
        </Form>
      </AddFriendWrapper>
    </StyledModal>
  );
}
