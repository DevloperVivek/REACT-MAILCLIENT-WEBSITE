import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthAction } from "./context/AuthRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Layout/Header";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import Inbox from "./components/Inbox/Inbox";
import Editor from "./components/Home/Editor";
import Sent from "./components/Sent/Sent";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (!login) {
      dispatch(AuthAction.logout());
    } else {
      dispatch(AuthAction.login(login));
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/editor"} element={<Editor />} />
        <Route path={"/inbox"} element={<Inbox />} />
        <Route path={"/sent"} element={<Sent />} />
      </Routes>
    </Router>
  );
}

export default App;
