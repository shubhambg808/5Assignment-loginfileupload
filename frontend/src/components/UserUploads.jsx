import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./UserUpload.module.css";

const UserUploads = ({ id, listUpdate }) => {
  const url = "http://localhost:8000";
  const userDetails = useSelector((state) => state.userSlice.userData);

  const [userUploads, setUserUploads] = useState([]);
  const [model, setShomodel] = useState(false);
  const [pin, setPin] = useState("");
  const [verified, setVerify] = useState(false);
  const [delLoad, setOnDelete] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get(`${url}/user/userUploads/${id}`, config)
      .then((res) => {
        setUserUploads(res.data.files.uploads);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [listUpdate, delLoad]);

  const downloadHandle = (upload) => {
    setShomodel(!model);
    setDownloadLink(upload);
  };

  const pinVerify = () => {
    if (pin == userDetails.securepin) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  const clear = () => {
    setShomodel(!model);
    setDownloadLink("");
    setPin("");
    setVerify(!verified);
  };

  const deleteHandle = (upload) => {
    axios
      .delete(`${url}/user/delete`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        data: {
          id: userDetails._id,
          delData: upload,
        },
      })
      .then((res) => {  
        setOnDelete(!delLoad);
      })
      .catch((err) => {
        console.log(err);
      }); 
  };

  return (
    <div>
      <h3>Your Uploads</h3>

      <div
        style={{ borderColor: verified ? "green" : "red" }}
        className={model ? style.modelBox : style.hide}
      >
        <h6>Verify Secure Pin</h6>
        <input
          placeholder="Secure pin"
          name="pin"
          value={pin}
          type="number"
          onChange={(e) => setPin(e.target.value)}
        />
        <br />
        <button
          className="btn btn-outline-info"
          style={{ margin: "10px" }}
          onClick={() => {
            pinVerify();
          }}
        >
          Verify
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => setShomodel(!model)}
          style={{ margin: "10px" }}
        >
          cancel
        </button>
        <br />
        <p>
          {verified ? (
            <a
              href={`${downloadLink}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={clear}
            >
              {" "}
              Click To Download
            </a>
          ) : (
            "Enter correct password"
          )}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        {userUploads.map((upload, index) => (
          <div key={index} className={style.data}>
            <br />
            <p>{upload}</p>
            <br />
            <button
              onClick={() => downloadHandle(upload)}
              className="btn btn-outline-info"
            >
              Download
            </button>

            <button
              style={{
                margin: "10px",
              }}
              className="btn btn-outline-danger"
              onClick={() => {
                deleteHandle(upload);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserUploads;
