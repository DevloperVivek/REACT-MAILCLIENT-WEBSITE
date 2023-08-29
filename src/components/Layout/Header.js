import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../context/AuthRedux";
import { useEffect } from "react";
import classes from "./Header.module.css";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    navigate("/login");
  };

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login && window.location.pathname === "/Home") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <header>
      <div className={classes["header-item"]}>
        {!Auth.isLogin && <>React MailBox</>}
        {Auth.isLogin && (
          <>
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/inbox">
              <span>Inbox</span>
            </Link>
            <Link to="/sent">
              <span>Sent</span>
            </Link>
          </>
        )}
        {Auth.isLogin && (
          <span className={classes.logout} onClick={logoutHandler}>
            Logout
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
