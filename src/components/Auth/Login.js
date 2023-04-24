import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/");
  };
  const toggleHandler = () => {
    navigate("/Signup");
  };
  const forgotPasswordHandler = () => {
    console.log("FORGOT");
  };
  return (
    <center className={classes.container}>
      <div className={classes.SignUp}>
        <h2>Login</h2>
        <form onSubmit={submitHandler} className={classes.formInputs}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <button>Login</button>
        </form>
        <div className={classes.p1}>
          <span onClick={forgotPasswordHandler}>Forgot Password?</span>
        </div>
        <div>
          <p onClick={toggleHandler}>Dont Have Account ? Signup</p>
        </div>
      </div>
    </center>
  );
};

export default Login;
