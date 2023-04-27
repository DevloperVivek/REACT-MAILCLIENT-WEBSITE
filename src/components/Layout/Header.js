// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import classes from "./Header.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { AuthAction } from "../../context/Auth-Redux";
// import { useEffect } from "react";

// const Header = () => {
//   const Auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     dispatch(AuthAction.logout());
//     navigate("/Login");
//   };

//   useEffect(() => {
//     const login = localStorage.getItem("login");
//     if (login) {
//       console.log(login);
//       // dispatch(AuthAction.login());
//       navigate("/Home");
//     } else {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <header>
//       <div className={classes["header-item"]}>
//         {Auth.isLogin && (
//           <>
//             <Link to="/Home">
//               <span>Home</span>
//             </Link>
//             <Link to="/Inbox">
//               <span>Inbox</span>
//             </Link>
//             <Link to="/Sent">
//               <span>Sent</span>
//             </Link>
//           </>
//         )}
//         {!Auth.isLogin && (
//           <>
//             {/* <Link to="/Login">
//               <span>Login</span>
//             </Link>
//             <Link to="/Signup">
//               <span>Signup</span>
//             </Link> */}
//             React MailBox
//           </>
//         )}
//         {Auth.isLogin && <span onClick={logoutHandler}>Logout</span>}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../context/Auth-Redux";
// import { useEffect } from "react";

const Header = () => {
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(AuthAction.logout());
    navigate("/Login");
  };

  // useEffect(() => {
  //   const login = localStorage.getItem("login");
  //   if (login) {
  //     console.log(login);
  //     dispatch(AuthAction.login(login));
  //     navigate("/");
  //   }
  // }, []);

  return (
    <header>
      <div className={classes["header-item"]}>
        {Auth.isLogin && (
          <>
            <Link to="/Home">
              <span>Home</span>
            </Link>
            <Link to="/Inbox">
              <span>Inbox</span>
            </Link>
            <Link to="/Sent">
              <span>Sent</span>
            </Link>
          </>
        )}
        {!Auth.isLogin && (
          <>
            {/* <Link to="/Login">
              <span>Login</span>
            </Link>
            <Link to="/Signup">
              <span>Signup</span>
            </Link> */}
            React MailBox
          </>
        )}
        {Auth.isLogin && <span onClick={logoutHandler}>Logout</span>}
      </div>
    </header>
  );
};

export default Header;
