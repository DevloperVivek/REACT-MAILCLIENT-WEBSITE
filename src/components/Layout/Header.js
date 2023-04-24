import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={classes["header-item"]}>
        <NavLink to="/">
          <span>Home</span>
        </NavLink>
        <NavLink to="/Login">
          <span>Login</span>
        </NavLink>
        <NavLink to="/Signup">
          <span>Signup</span>
        </NavLink>{" "}
        <NavLink to="/Login">
          <span>Logout</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
