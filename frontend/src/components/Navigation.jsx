import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.css";
import logo from "../assets/bee.png";
import { useSelector } from "react-redux";

const Navigation = () => {
  const [load, setLoad] = useState(false);
  useEffect(() => {}, [load]);
  const auth = localStorage.getItem("token");
  const store = useSelector((state) => state.userSlice.userData);

  return (
    <div>
      <nav className={style.navBar}>
        <div>
          <img src={logo} alt="logo" className={style.logo} />
          <Link
            to={auth ? `/usercomp/${store._id}` : "/login"}
            className={style.click}
          >
            User Profile
          </Link>
        </div>
        <div className={style.navClick}>
          <Link to={"/newsignup"} className={style.click}>
            signup
          </Link>

          <Link
            to={auth ? "/" : "/login"}
            onClick={
              auth
                ? () => {
                    localStorage.removeItem("token");
                    setLoad(!load);
                  }
                : ""
            }
            className={style.click}
          >
            {auth ? "LogOut" : "Login"}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
