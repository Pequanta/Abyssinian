import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp4.png";

function Groups(props) {
  const [groupsList, setGroupsList] = useState([]);
  const [tempHolder, setTempHolder] = useState([])
  const [roomId, setRoomId] = useState();//though there is a general roomId variable being drilled to the components , additional roomId
  //in both Groups.jsx and DMList.jsx is usded to lessen the complication
  useEffect(function fetchGroupList() {
    console.log(props.currentActiveUser);
    const fetchData = async () => {
      const response = await fetch(
        `${props.backendHttpUrl}/chats/access/groups/all/groups?current_user=${props.currentActiveUser}`,
        { method: "get" }
      );
      if (response.ok) {
        const result = response.json();
        console.log(result);
        result.then((content) => {
          console.log(content);
          setGroupsList([...content]);
          setTempHolder([...content])
        });
      } else {
        console.log("helloworld");
      }
    };
    fetchData();
  }, []);
  const handleInputChange = (event) =>{
    const text = event.target.value;
    event.preventDefault();
    setGroupsList(tempHolder.filter(
      (item) =>(
        item["group_name"].search(text) !== -1)
      )
    )

  }
  const startConverstation = async (event, groupName, roomId) => {
    const response = await fetch(
      `${props.backendHttpUrl}/chats/access/groups/group/${groupName}?group_name=${groupName}`,
      {method: "get"}
    );
    const result = response.json();
    result.then((content)=>{
      console.log(content)
      props.setChatDisplayed([...content])
    })
    console.log(roomId);
    props.setSelectedChat({
      chatType: "GROUP",
      Name: groupName,
      roomId: roomId,
    }); 
    props.setRoomId(roomId)
  };
  return (
    <div className={styles.group_page}>
      <div className={styles.search_button}>
        <form>
          <input type="text" onChange={(event) => handleInputChange(event)}className={styles.text_input} placeholder="🔍 search group"/>
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
