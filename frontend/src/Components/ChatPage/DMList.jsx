import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp2.png";
function DMList(props) {
  const [userList, setUserList] = useState([]);
  const [tempHolder, setTempHolder] = useState([]);

  useEffect(function fetchDMList() {
    const fetchData = async () => {
      const response = await fetch(
        `${props.backendHttpUrl}/chats/access/groups/all/dms?current_user=${props.currentActiveUser}`,
        { method: "get" }
      );
      if (response.ok) {
        const result = response.json();
        result.then((content) => {
          setUserList(content.result)
          setTempHolder(content.result)
        });
      } else {
        console.log("user not found");
      } 
      console.log()
    };
    fetchData();
  }, []);

  const startConverstation = async (event, userName , groupId) => {
    console.log(userList);
    const response = await fetch(
      `${props.backendHttpUrl}/chats/access/groups/dms?user_name=${userName}&current_user=${props.currentActiveUser}`,
      {method: "get"}
    );
    const result = response.json();
    result.then((content)=>{
      props.setChatDisplayed([...content])
    })
    console.log(groupId);
    props.setSelectedChat({
      chatType: "DM",
      Name: userName,
      roomId: groupId,
    });
    props.setRoomId(groupId)
  };

  const handleInputChange = (event) =>{
    const text = event.target.value;
    event.preventDefault();
    setUserList(tempHolder.filter(
      (item) =>(
        item["members"].filter(member => member !== props.currentActiveUser)[0].toUpperCase().search(text.toUpperCase()) !== -1)
      )
    )

  }
  return (
    <div className={styles.dm_list}>
      <div className={styles.search_button}>
        <form>
          <input type="text" className={styles.text_input} onChange={(event) => handleInputChange(event)} placeholder="🔍 search user"/>
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
                  )[0], user["_id"]
                )
              }
            />
          ))}
      </div>
    </div>
  );
}

export default DMList;
