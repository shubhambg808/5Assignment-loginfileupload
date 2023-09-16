import React, { useEffect, useState } from "react";
import HomePageNav from "./HomePageNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const imgaddress =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dsignup%2Bform&psig=AOvVaw2TJXk6mU2YzwscfbZ1csaX&ust=1685445715306000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPCE3_W0mv8CFQAAAAAdAAAAABAK";

const SignUpUser = () => {
  const url = "http://localhost:8000";
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    securepin: "",
    password: "",
  });
  const [showResult, setShowResult] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (
      userData.name.length > 4 &&
      userData.password.length > 4 &&
      userData.username.length > 4 &&
      userData.securepin.length > 4
    ) {
      axios
        .post(`${url}/auth/signup`, userData)
        .then((res) => {
          setShowResult(res.data.message);
          setTimeout(() => {
            navigate("/");
            setShowResult("");
          }, 800);
          setUserData({
            name: "",
            username: "",
            securepin: "",
            password: "",
          });
          setTimeout(() => {
            setShowResult("");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setShowResult(err.response.data.message);
          setTimeout(() => {
            setShowResult("");
          }, 5000);
        });
    } else {
      alert(
        "Input cant be empty Chracter length should greater than minimum Four  !"
      );
    }
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div>
      <div>
        <HomePageNav />
        <h1>SignUp Page</h1>
        <section style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <img
              style={{ heigth: "500px", width: "500px", zIndex: "-1" }}
              src="https://t4.ftcdn.net/jpg/05/58/06/81/360_F_558068185_sZmfyrWuzHTfzLdwJuj1ALQcBtbKAtbA.jpg"
              alt="background img"
            />
          </div>
          <div
            style={{
              height: "auto",
              margin: "auto",
              width: "500px",
              boxShadow: " 0px 0px 4px 0px",
              borderRadius: "25px",
            }}
          >
            <h4 style={{ color: "blueviolet" }}>{showResult}</h4>

            <label> Name</label>
            <br />
            <input
              type="text"
              placeholder="name"
              style={{ width: "400px", textAlign: "center", margin: "25px" }}
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <br />
            <label> Username</label>
            <br />
            <input
              type="text"
              placeholder="username"
              style={{ width: "400px", textAlign: "center", margin: "25px" }}
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <br />
            <label> secure pin</label>
            <br />
            <input
              type="text"
              placeholder="securepin"
              style={{ width: "400px", textAlign: "center", margin: "25px" }}
              name="securepin"
              value={userData.securepin}
              onChange={handleChange}
            />
            <br />
            <label> Pasword</label>
            <br />
            <input
              type={check ? "text" : "password"}
              placeholder="password"
              style={{ width: "400px", textAlign: "center", margin: "25px" }}
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <br />
            <input type="checkbox" onClick={handleCheck} />
            <label>{check ? "Hide" : "Show"}</label>
            <br />
            <button onClick={handleClick}>Submit</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpUser;
