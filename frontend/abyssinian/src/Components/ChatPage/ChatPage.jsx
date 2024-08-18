import styles from "./chatpagestyles.module.css";
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ChatCard from "./ChatCard";

function ChatPage(props) {
  const [selectedChat, setSelectedChat] = useState([]);
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
          <div className={styles.chat_display_area}>
            {props.chatToDisplay.map((chat) => (
              <ChatCard
                key={props.chatToDisplay.indexOf(chat)}
                content={
                  props.chatToDisplay[props.chatToDisplay.indexOf(chat)][
                    "content"
                  ]
                }
              />
            ))}
          </div>
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
