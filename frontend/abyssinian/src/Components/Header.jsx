import logoPic from "../assets/logo.jpg";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
function Header() {
  const [theme, setTheme] = useState("light");
  const [activeHome, setActiveHome] = useState(false);
  const [activeChat, setActiveChat] = useState(false);
  const [activeVlog, setActiveVlog] = useState(false);
  const [activeAbout, setActiveAbout] = useState(false);
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
                className={`${activeHome ? "active" : ""}`}
                onClick={(event) => {
                  setActiveHome(true);
                  setActiveChat(false);
                  setActiveVlog(false);
                  setActiveAbout(false);
                }}
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
                className={`${activeChat ? "active" : ""}`}
                onClick={(event) => {
                  setActiveChat(true);
                  setActiveHome(false);
                  setActiveVlog(false);
                  setActiveAbout(false);
                }}
              >
                chat
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <NavLink
                id="links_"
                to="/vlog"
                className={`${activeVlog ? "active" : ""}`}
                onClick={(event) => {
                  setActiveHome(false);
                  setActiveChat(false);
                  setActiveVlog(true);
                  setActiveAbout(false);
                }}
              >
                Vlogs
              </NavLink>
            </li>
          </div>
          <li>
            <NavLink
              id="links_"
              to="/about"
              className={`${activeAbout ? "active" : ""}`}
              onClick={(event) => {
                setActiveHome(false);
                setActiveChat(false);
                setActiveVlog(false);
                setActiveAbout(true);
              }}
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
