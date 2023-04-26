import "./App.css";
import Header from "./components/Layout/Header";
import Signup from "./components/Auth/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import Inbox from "./components/Inbox/Inbox";
import Editor from "./components/Home/Editor";
import Sent from "./components/Inbox/Sent";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Signup"} element={<Signup />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Inbox"} element={<Inbox />} />
        <Route path={"/Editor"} element={<Editor />} />
        <Route path={"/Sent"} element={<Sent />} />
      </Routes>
    </Router>
  );
}

export default App;
