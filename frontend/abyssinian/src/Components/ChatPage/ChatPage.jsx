import styles from "./chatpagestyles.module.css";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

function ChatPage() {
  const [theme, setTheme] = useState("light");
  const [selectedChat, setSelectedChat] = useState([]);
  const changeTheme = (event) => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };
  return (
    <>
      <div className={styles.chat_container}>
        <div className={styles.chat_page_handler}>
          <div className={styles.header}>
            <header>
              <nav>
                <ul>
                  <li>
                    <NavLink to="/chat/">DMs</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chat/group-page">ChatRooms</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chat/user-profile">Profile</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={(event) => {
                        changeTheme(event);
                      }}
                      className="theme_button"
                    >
                      {theme === "dark" && <MdDarkMode />}
                      {theme === "light" && <CiLight />}
                    </button>
                  </li>
                </ul>
              </nav>
            </header>
          </div>
          <div className={styles.pageHandlerComponents}>
            <div className={styles.content_displayer}>
              <Outlet />
            </div>
          </div>
        </div>
        <div className={styles.chat_area}>
          <div className={styles.chat_display_area}></div>
          <div className={styles.chat_text_input}>
            <textarea className={styles.text_area} />
            <button>send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
