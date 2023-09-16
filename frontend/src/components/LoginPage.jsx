import React, { useState } from "react";
import HomePageNav from "./HomePageNav";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const url = "http://localhost:8000";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [check, setCheck] = useState(false);
  const [showResult, setShowResult] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (userData.username.length > 5 && userData.password.length > 5) {
      axios
        .post(`${url}/auth/login`, userData)
        .then((res) => {
          setShowResult(res.data.message);
          localStorage.setItem("token", res.data.keyToken);
          setUserData({
            username: "",
            password: "",
          });
          navigate(`/usercomp/${res.data.user._id}`);
        })
        .catch((err) => {
          setShowResult(err.response.data.message);
        });
    } else {
      alert("username and password length must be more than five charachter !");
      return;
    }
  };
  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div>
      <HomePageNav />
      <div>
        <h1>Login Page</h1>
        <input
          type="text"
          placeholder="username"
          style={{ width: "600px", textAlign: "center", margin: "25px" }}
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <br />
        <input
          type={check ? "text" : "password"}
          placeholder="password"
          style={{ width: "600px", textAlign: "center", margin: "25px" }}
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <br />
        <input type="checkbox" onClick={handleCheck} />
        <label>{check ? "Hide" : "Show"}</label>
        <br />
        <button onClick={handleClick}>Submit</button>
        <h4>{showResult}</h4>
      </div>
    </div>
  );
};

export default LoginPage;
