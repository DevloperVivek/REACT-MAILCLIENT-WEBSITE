import "./App.css";
import Header from "./components/Layout/Header";
import Signup from "./components/Auth/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Signup"} element={<Signup />} />
        <Route path={"/Login"} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
