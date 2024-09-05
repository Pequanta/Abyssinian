import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp4.png";

function Groups(props) {
  const [groupsList, setGroupsList] = useState([]);
  useEffect(function fetchGroupList() {
    console.log(props.currentActiveUser);
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8002/chats/access/groups/all/groups?current_user=${props.currentActiveUser}`,
        { method: "get" }
      );
      if (response.ok) {
        const result = response.json();
        console.log(result);
        result.then((content) => {
          console.log(content);
          setGroupsList([...content]);
        });
      } else {
        console.log("helloworld");
      }
    };
    fetchData();
  }, []);
  const searchForDM = (event) => {
    event.preventDefault();
  };
  const startConverstation = async (event, groupName, roomId) => {
    console.log(roomId)
    const response = await fetch(
      `http://localhost:8002/chats/access/groups/group/${groupName}?group_name=${groupName}`,
      { method: "get" }
    );
    const result = response.json();
    props.setSelectedChat({
      chatType: "GROUP",
      Name: groupName,
      roomId: roomId,
    });
    props.setSocketGroup(new WebSocket(`ws://localhost:8002/chats/group/chat?room_id=${roomId}`))
    props.socketGroup.onmessage = async function(event){
      console.log(event.data)
    }
    result.then((content) => {
      props.setChatDisplayed(content);
    });
    console.log(groupsList);
    if (!response.ok) {
      console.log("error");
    } else {
      console.log(response.data);
    }
  };
  return (
    <div className={styles.group_page}>
      <div className={styles.search_button}>
        <form onSubmit={searchForDM}>
          <input type="text" className={styles.text_input} />
          <input type="submit" value="🔍" className={styles.submit} />
        </form>
      </div>
      {(Array.isArray(groupsList) && groupsList[0] !== undefined)&&
        groupsList.map((group, index) => (
          <AvatarTab
            profileImage={pic}
            Name={group.group_name}
            key={index}
            startConversationFunction={(event) =>
              startConverstation(event, group["group_name"], group["_id"])
            }
          />
        ))}
    </div>
  );
}

export default Groups;
