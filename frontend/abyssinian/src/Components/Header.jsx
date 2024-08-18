import logoPic from "../assets/logo.jpg";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
function Header() {
  const [theme, setTheme] = useState("light");
  const changeTheme = (event) => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };
  return (
    <header className="main_header">
      <img src={logoPic} />
      <nav>
        <ul>
          <div>
            <li>
              <NavLink
                id="links_"
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink
                id="links_"
                to="/chat"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                chat
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink
                id="links_"
                to="/chat"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Vlogs
              </NavLink>
            </li>
          </div>
          <li>
            <NavLink
              id="links_"
              to="#"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <button
              onClick={(event) => {
                changeTheme(event);
              }}
              className="theme_button"
            >
              {theme === "dark" && <MdDarkMode className="symbol" />}
              {theme === "light" && <CiLight className="symbol" />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
