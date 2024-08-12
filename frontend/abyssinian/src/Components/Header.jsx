import logoPic from "../assets/logo.jpg";
import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="main_header">
      <img src={logoPic} />
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/chat">chat</Link>
            </li>
          </div>
          <li>
            <Link to="#">About</Link>
          </li>
          <div></div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
