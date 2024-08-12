import logoPic from "../assets/logo.jpg";
import Reactnpm from "react";
import { NavLink, Outlet } from "react-router-dom";
function Header() {
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
          <li>
            <NavLink
              id="links_"
              to="#"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
