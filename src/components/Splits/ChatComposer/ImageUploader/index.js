import React, { useState } from "react";
import { StyledModal } from "../../../common/StyledModal/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import { StyledButton } from "../../../common/StyledButton/styles";
import { UploadWrapper } from "./styles";
import Dropzone from "react-dropzone";
import { Spin } from "antd";

export default function ImageUploader({
  isImageUploadVisible,
  setIsImageUploadVisible,
  sendImages,
}) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { threadId } = useParams();

  const handleCancel = () => {
    setIsImageUploadVisible(false);
    setFiles([]);
  };

  const uploadFiles = () => {
    setIsUploading(true);
    console.log(files, "uploading to thread", threadId);
    if (files.length > 0) {
      let promises = [];
      files.forEach((file) => {
        let formData = new FormData();
        formData.append("attachment", file);
        formData.append("thread_id", threadId);
        promises.push(
          axios.post("rest/v1/files/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );
      });

      axios.all(promises).then(
        axios.spread((...results) => {
          console.log(results);
          let fileNames = [];
          results.forEach((result) => {
            if (result.status === 200) {
              let resultData = result.data.data[0];
              fileNames.push(resultData.file_name);
            }
          });
          console.log(fileNames);
          sendImages(fileNames);
          setFiles([]);
          handleCancel();
          setIsUploading(false);
        })
      );
    }
  };

  const onDrop = async (acceptedFiles) => {
    console.log(acceptedFiles);
    const fileList = await Promise.all(
      acceptedFiles.map(async (file) => {
        if (file.type === "image/png") return file;
        const imageFile = file;
        console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          return compressedFile;
        } catch (error) {
          console.log(error);
        }
      })
    );
    console.log(acceptedFiles);
    setFiles(fileList);
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

  return (
    <StyledModal
      title="Send Images"
      visible={isImageUploadVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <UploadWrapper>
        {files.length > 0 && (
          <div className="thumb-grid">
            {files.map((file) => {
              return (
                <img
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  height={90}
                  width={90}
                  style={{ objectFit: "cover" }}
                ></img>
              );
            })}
          </div>
        )}
        <Dropzone onDrop={onDrop} accept="image/jpeg, image/png" maxFiles={10}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <center className="file-select">
                  <PlusOutlined />
                  <p>Select files</p>
                </center>
              </div>
            </section>
          )}
        </Dropzone>
        <div className="footer">
          <StyledButton
            htmlType="submit"
            onClick={uploadFiles}
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? <Spin indicator={loadingIcon} /> : "Send"}
          </StyledButton>
        </div>
      </UploadWrapper>
    </StyledModal>
  );
}
