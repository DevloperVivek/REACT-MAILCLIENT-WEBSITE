import React from "react";
import classes from "./Home.module.css";
import Editor from "./Editor";

const Home = () => {
  return (
    <div>
      <div className={classes["home-container"]}>
        <div className={classes["home-title"]}>WELCOME TO REACT MAIL BOX</div>
      </div>
      <Editor />
    </div>
  );
};

export default Home;
