import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState, useRef } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ChatCard from "./ChatCard";

function ChatPage(props) {
  const [chatToSend, setChatToSend] = useState();
  const [activeDM, setActiveDM] = useState(true);
  const [activeGroups, setActiveGroups] = useState(false);
  const [activeUserProfile, setActiveProfile] = useState(false);
  const [activeNewChat, setActiveNewChat] = useState(false);
  let socket = useRef(null);
  
  useEffect(()=>{
    const connection = async () => {
      if(props.selectedChat["chatType"] === "DM"){
        socket.current = new WebSocket(`${props.backendWebSocketUrl}/chats/dm/chat?room_id=${props.roomId}`);
        socket.current.onopen = async (event) => {
          console.log("connected");
        }
        socket.current.onmessage =  async (event) => {
          let currentArr = props.chatDisplayed
          let recievedMessage = JSON.parse(event.data)
          currentArr.push(recievedMessage["message"])
          console.log(currentArr)
          props.setChatDisplayed([...currentArr])
        } 
      }else if(props.selectedChat["chatType"] === "GROUP"){
        socket.current = new WebSocket(`${props.backendWebSocketUrl}/chats/group/chat?room_id=${props.roomId}`);
        const currentArr = props.chatDisplayed
        socket.current.onopen = async (event) => {
          console.log("connected");
        }
        socket.current.onmessage =  async (event) => {
          let recievedMessage = JSON.parse(event.data)
          currentArr.push(recievedMessage["message"])
          props.setChatDisplayed([...currentArr])
        } 
      }
  }
  connection();
  return async ()=>{
    if(socket.current) await socket.current.close();
  }
},[props.roomId])
const startConverstation = async (event, name , roomId, roomType) => {
  if(roomType === "DM"){
    const response = await fetch(
      `${props.backendHttpUrl}/chats/access/groups/dms?user_name=${name}&current_user=${props.currentActiveUser}`,
      {method: "get"}
    );
    const result = response.json();
    result.then((content)=>{
      props.setChatDisplayed([...content])
    })
    console.log(groupId);
    props.setSelectedChat({
      chatType: "DM",
      Name: name,
      roomId: roomId,
    });
  }else if(roomType==="GROUP"){
      const response = await fetch(
        `${props.backendHttpUrl}/chats/access/groups/group/${name}?group_name=${name}`,
        {method: "get"}
      );
      const result = response.json();
      result.then((content)=>{
        props.setChatDisplayed([...content])
      })
      console.log(romId);
      props.setSelectedChat({
        chatType: "GROUP",
        Name: name,
        roomId: roomId,
      });
    }
  props.setRoomId(groupId)
};


const sendChat = async (event) => {
  document.getElementById("inputBox").value = "";
  if(socket.current && socket.current.readyState === WebSocket.OPEN){
    await socket.current.send(JSON.stringify({
      "sent_chat": chatToSend,
      "sender_username": props.currentActiveUser
    }))
    if(props.selectedChat["chatType"] === "DM"){
      startConverstation(selectedChat["Name"], selectedChat["roomId"], "DM");
    }else if(props.selectedChat["chatType"] === "GROUP"){
      startConverstation(selectedChat["Name"], selectedChat["roomId"], "GROUP")
    }
  }else{
    console.log(socket);
  }
};
const handleInputChange = (event) => {
  const textContent = event.target.value;
  setChatToSend(textContent);
  };
return (
    <div className={styles.chat_container}>
      <div className={styles.chat_page_handler}>
        <div className={styles.header}>
          <header>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to="/chat/"
                    id="subLinks"
                    className={`${activeDM ? styles.active : ""}`}
                    onClick={(event) => {
                      setActiveDM(true);
                      setActiveGroups(false);
                      setActiveNewChat(false);
                      setActiveProfile(false);
                    }}
                  >
                    DMs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat/group-page"
                    id="subLinks"
                    className={`${activeGroups ? styles.active : ""}`}
                    onClick={(event) => {
                      setActiveDM(false);
                      setActiveGroups(true);
                      setActiveNewChat(false);
                      setActiveProfile(false);
                    }}
                  >
                    ChatRooms
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat/user-profile"
                    id="subLinks"
                    className={`${activeUserProfile ? styles.active : ""}`}
                    onClick={(event) => {
                      setActiveDM(false);
                      setActiveGroups(false);
                      setActiveNewChat(false);
                      setActiveProfile(true);
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat/new-chat"
                    id="subLinks"
                    className={`${activeNewChat ? styles.active : ""}`}
                    onClick={(event) => {
                      setActiveDM(false);
                      setActiveGroups(false);
                      setActiveNewChat(true);
                      setActiveProfile(false);
                    }}
                  >
                    ➕New
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
        {useEffect(() => {
          const place = document.getElementById("endOfText");
          if (place) {
            place.scrollIntoView({});
          }
        }, [props.chatDisplayed])}
        <div className={styles.chat_display_area}>
          {props.chatDisplayed.map((chat, index) => (
            <ChatCard
              key={index}
              content={
                props.chatDisplayed[props.chatDisplayed.indexOf(chat)][
                  "chat_text"
                ]
              }
              sentTime={
                props.chatDisplayed[props.chatDisplayed.indexOf(chat)][
                  "sent_time"
                ]
              }
              senderName={
                props.chatDisplayed[props.chatDisplayed.indexOf(chat)][
                  "sender_username"
                ]
              }
              currentActiveUser={props.currentActiveUser}
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
  );
}

export default ChatPage;
