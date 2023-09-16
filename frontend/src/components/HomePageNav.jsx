import React from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.css";
import logo from "../assets/bee.png";

const HomePageNav = () => {
  return (
    <div>
      <nav className={style.navBar}>
        <div>
          <img src={logo} alt="logo" className={style.logo} />
        </div>
        <Link
          to={"/"}
          className={style.click}
          style={{ margin: "10px 20px 0 0" }}
        >
          home page
        </Link>
      </nav>
    </div>
  );
};

export default HomePageNav;
