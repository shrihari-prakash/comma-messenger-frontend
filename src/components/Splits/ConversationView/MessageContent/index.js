import React, { useEffect, useState } from "react";
import { Image } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function MessageContent({ message }) {
  const [image, setImage] = useState(null);

  const { threadId } = useParams();

  const loadImage = (message, index) => {
    axios
      .get("/files/download", {
        params: {
          thread_id: threadId,
          file_name: message.file_name,
        },
      })
      .then((result) => {
        if (result.data.status === 200) {
          console.log(result.data.data[0].presigned_url);
          setImage(result.data.data[0].presigned_url);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (message.type === "image") {
      loadImage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (message.type) {
    case "text":
      return message.content;
    case "image":
      return image ? (
        <Image width={200} height={200} src={image} objectfit="cover" />
      ) : (
        <div className="img-loader">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      );
    default:
      return null;
  }
}
