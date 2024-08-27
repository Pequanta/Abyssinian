import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ChatCard from "./ChatCard";

function ChatPage(props) {
  const [chatToSend, setChatToSend] = useState();
  const handleInputChange = (event) => {
    const textContent = event.target.value;
    setChatToSend(textContent);
  };
  const startConverstation = async (name, chatType) => {
    let response;
    if (chatType === "DM") {
      response = await fetch(
        `http://localhost:8002/chats/access/groups/dms/${name}?user_name=${name}`
      );
      props.chatSelectionFunction({
        chatType: "DM",
        Name: userName,
      });
    } else if (chatType === "GROUP") {
      response = await fetch(
        `http://localhost:8002/chats/access/groups/group/${name}?group_name=${name}`
      );
      props.chatSelectionFunction({
        chatType: "GROUP",
        Name: name,
      });
    } else {
      console.log("hello world");
    }
    const result = response.json();
    result.then((content) => {
      props.chatSetterFunction(content);
    });

    if (!response.ok) {
      console.log("error");
    } else {
      console.log(response.data);
    }
  };
  const sendChat = async (event) => {
    let readingResponse;
    document.getElementById("inputBox").value = "";
    let name = props.chatSelected["Name"];
    if (props.chatSelected["chatType"] === "DM") {
      const response = await fetch(
        `http://localhost:8002/chats/add_chat/groups/dm/${props.chatSelected["Name"]}?chat=${chatToSend}&user_name=${props.chatSelected["Name"]}`,
        { method: "post" }
      );

      await startConverstation(name, "DM");
      console.log(props.chatToDisplay);
    } else if (props.chatSelected["chatType"] === "GROUP") {
      const response = await fetch(
        `http://localhost:8002/chats/add_chat/groups/group/${props.chatSelected["Name"]}?chat=${chatToSend}&group_name=${props.chatSelected["Name"]}`,
        { method: "post" }
      );
      await startConverstation(name, "GROUP");
      console.log(props.chatToDisplay);
    } else {
      console.log("chat not selected");
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
                    <NavLink to="/chat/new-chat">
                      <button className={styles.newButton}>➕New</button>
                    </NavLink>
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
                sentTime={
                  props.chatToDisplay[props.chatToDisplay.indexOf(chat)][
                    "sent_time"
                  ]
                }
                senderName={
                  props.chatToDisplay[props.chatToDisplay.indexOf(chat)][
                    "sender_user_name"
                  ]
                }
              />
            ))}
            <div id="endOfText"></div>
          </div>
          <div className={styles.chat_text_input}>
            <textarea
              className={styles.text_area}
              onChange={(event) => handleInputChange(event)}
              id="inputBox"
            />
            <button onClick={(event) => sendChat(event)}>send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
