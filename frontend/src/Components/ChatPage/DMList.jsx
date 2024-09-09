import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp2.png";
function DMList(props) {
  const [userList, setUserList] = useState([]);
  const [roomId, setRoomId] = useState();

  useEffect(function fetchDMList() {
    const fetchData = async () => {
      const response = await fetch(
        `${props.backendHttpUrl}/chats/access/groups/all/dms?current_user=${props.currentActiveUser}`,
        { method: "get" }
      );
      if (response.ok) {
        const result = response.json();
        result.then((content) => {
          console.log(...content.result)
          setUserList(content.result)
        });
      } else {
        console.log("user not found");
      } 
      console.log()
    };
    fetchData();
  }, []);

  const getRoomId = async (userName) => {
    const response = await fetch(
      `${props.backendHttpUrl}/chats/access/get-group-id?user_name=${userName}&current_user=${props.currentActiveUser}`,
      { method: "get" }
    );
    const result = response.json();
    result.then((content) => {
        setRoomId(content);
    });
  }
  const startConverstation = async (event, userName) => {
    getRoomId(userName)
    const response = await fetch(
      `${props.backendHttpUrl}/chats/access/groups/dms?user_name=${userName}&current_user=${props.currentActiveUser}`,
      {method: "get"}
    );
    const result = response.json();
    result.then((content)=>{
      props.setChatDisplayed([...content])
    })
    console.log(roomId);
    props.setSelectedChat({
      chatType: "DM",
      Name: userName,
      roomId: roomId,
    });
    props.setRoomId(roomId)
  };
  const searchForDM = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.dm_list}>
      <div className={styles.search_button}>
        <form onSubmit={searchForDM}>
          <input type="text" className={styles.text_input} />
          <input type="submit" value="🔍" className={styles.submit} />
        </form>
      </div>
      <div className={styles.itemList}>
        {(Array.isArray(userList) && userList[0] !== undefined)&&
          userList.map((user, index) => (
            <AvatarTab
              profileImage={pic}
              Name={
                user["members"].filter(
                  (member) => member !== props.currentActiveUser
                )[0]
              }
              key={index}
              startConversationFunction={(event) =>
                startConverstation(
                  event,
                  user["members"].filter(
                    (member) => member !== props.currentActiveUser
                  )[0]
                )
              }
            />
          ))}
      </div>
    </div>
  );
}

export default DMList;
