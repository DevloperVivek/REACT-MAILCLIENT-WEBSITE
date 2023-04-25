import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../context/Auth-Redux";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    navigate("/Login");
  };

  useEffect(() => {
    if (!Auth.isLogin) {
      navigate("/Login");
    }
  }, []);

  return (
    <header>
      <div className={classes["header-item"]}>
        {Auth.isLogin && (
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Inbox">
            <span>Inbox</span>
          </NavLink>
        )}
        {Auth.isLogin && (
          <NavLink to="/Sent">
            <span>Sent</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to="/Login">
            <span>Login</span>
          </NavLink>
        )}
        {!Auth.isLogin && (
          <NavLink to="/Signup">
            <span>Signup</span>
          </NavLink>
        )}
        {Auth.isLogin && <span onClick={logoutHandler}>Logout</span>}
        {/* {Auth.isLogin && (
          <NavLink to="/Login" onClick={logoutHandler}>
            <span>Logout</span>
          </NavLink>
        )} */}
      </div>
    </header>
  );
};

export default Header;
