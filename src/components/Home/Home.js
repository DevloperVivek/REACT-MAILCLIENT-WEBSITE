import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../context/AuthRedux";
import Editor from "./Editor";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      navigate("/login");
    } else {
      dispatch(AuthAction.login(login));
    }
  }, [dispatch, navigate]);

  const buttonHandler = () => {
    setIsClicked(true);
  };

  return (
    <div>
      <div className={classes["home-container"]}>
        {!isClicked && (
          <div>
            <div className={classes["home-title"]}>
              WELCOME TO REACT MAIL BOX
            </div>
            <p>Be Professional Be Official</p>
          </div>
        )}
        {!isClicked && (
          <button className={classes.btn} onClick={buttonHandler}>
            Compose
          </button>
        )}
        {isClicked && <Editor />}
      </div>
    </div>
  );
};

export default Home;
