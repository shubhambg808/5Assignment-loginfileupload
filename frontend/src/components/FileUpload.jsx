import React, { useState } from "react";
import axios from "axios";
const url = "http://localhost:8000";

const FileUpload = ({ id, updateUloadList }) => {
  const token = localStorage.getItem("token");
  const [file, setFile] = useState();
  const [res, setResponse] = useState("");
  const [loadFromFile, setLoadFromFile] = useState(false);

  const handleClick = () => {
    const formData = new FormData();
    formData.append("file", file);

    let config = {
      headers: {
        "content-Type": "multipart/form-data",
        authorization: token,
      },
    };

    axios
      .post(`${url}/user/upload/${id}`, formData, config)
      .then((res) => {
        setResponse(res.data.status);
        setLoadFromFile(!loadFromFile);
        updateUloadList(loadFromFile);
        setTimeout(() => {
          setResponse("");
        }, 1500);
      })
      .catch((err) => setResponse(err));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: " 0px 0px 4px 0px",
        borderRadius: "25px",
        margin: "50px 300px ",
      }}
    >
      <div
        style={{
          height: "200px",
          padding: " 25px 25px",
        }}
      >
        <h4>File Uploader</h4>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <br />
        <br />
        <button onClick={handleClick}>Upload</button>
        <h4>{res}</h4>
      </div>
    </div>
  );
};

export default FileUpload;
