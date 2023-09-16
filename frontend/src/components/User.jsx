import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import FileUpload from "./FileUpload";
import UserUploads from "./UserUploads";
import { useDispatch } from "react-redux";
import { setUserData } from "../userSlice";
import css from "./Usercomp.module.css";

const url = "http://localhost:8000";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [load, setLoad] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const [updateUplList, updateList] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    navigate(authToken ? `/usercomp/${id}` : "/");
    getDatabyId();
  }, [load]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  const getDatabyId = () => {
    axios
      .get(`${url}/user/getData/${id}`, config)
      .then((res) => {
        setUser(res.data.user);
        dispatch(setUserData(res.data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUloadList = (booldata) => {
    updateList(booldata);
  };

  const uploadComp = load ? (
    <FileUpload id={id} updateUloadList={updateUloadList} />
  ) : (
    ""
  );
  const userUploads = showUploads ? (
    <UserUploads id={id} listUpdate={updateUplList} />
  ) : (
    ""
  );

  return (
    <div>
      <nav className={css.navigate}>
        <div>
          <Link
            onClick={() => {
              setLoad(!load);
            }}
            style={{ textDecoration: "none", color: "white", margin: "0 50px" }}
          >
            Upload File
          </Link>
          <Link
            onClick={() => {
              setShowUploads(!showUploads);
            }}
            style={{ textDecoration: "none", color: "white" }}
          >
            Your Uploads
          </Link>
        </div>
        <div>
          <Link to={"/"} className={css.navLinkButtn}>
            Homepage
          </Link>
          <Link
            to={"/"}
            onClick={() => {
              localStorage.removeItem("token");
              dispatch(setUserData(null));
            }}
            className={css.navLinkButtn}
          >
            Log Out
          </Link>
        </div>
      </nav>
      <h1>
        welcome{"  "}
        {user.map((ele, ind) => (
          <span key={ind}>{ele.name}</span>
        ))}
      </h1>
      <div>{uploadComp}</div>
      <div>{userUploads}</div>
    </div>
  );
};

export default User;
