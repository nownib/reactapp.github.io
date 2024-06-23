import React, { useEffect, useState } from "react";
import "./Nav.scss";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
//dieu huong trang ko can refresh

const Nav = (props) => {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && 
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      }
    </>
  );
};

export default Nav;
