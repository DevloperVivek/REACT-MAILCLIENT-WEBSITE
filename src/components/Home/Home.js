import React, { useState } from "react";
import classes from "./Home.module.css";
import Editor from "./Editor";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [editor, setEditor] = useState(false);
  const navigate = useNavigate();

  const editorHandler = () => {
    // setEditor(true);
    navigate("/Editor");
  };

  return (
    <div>
      <div className={classes["home-container"]}>
        <div className={classes["home-title"]}>WELCOME TO REACT MAIL BOX</div>
        <p>Be Professional Be Official</p>
      </div>
      <div>
        <button className={classes.btn} onClick={editorHandler}>
          Compose
        </button>
      </div>
      {/* {editor && <Editor />} */}
    </div>
  );
};

export default Home;
