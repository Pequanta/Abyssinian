import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp2.png";
function DMList(props) {
  const [userList, setUserList] = useState([]);
  let emptyUserList = false;

  useEffect(function fetchDMList() {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8002/chats/access/groups/all/dms?current_user=${props.currentActiveUser}`,
        { method: "get" }
      );
      if (response.ok) {
        const result = response.json();
        result.then((content) => {
          if(content.result[0]) emptyUserList = false;
          else emptyUserList = true;
          setUserList([...userList, content.result[0]]);
        });
        console.log(emptyUserList)
      } else {
        console.log("user not found");
      } 
      console.log()
    };
    fetchData();
  }, []);
  const startConverstation = async (event, userName) => {
    console.log(userList);
    const response = await fetch(
      `http://localhost:8002/chats/access/groups/dms?user_name=${userName}&current_user=${props.currentActiveUser}`,
      { method: "get" }
    );
    const result = response.json();
    result.then((content) => {
      console.log(content);
      for (let item in content) {
        props.chatSetterFunction(content);
      }
      console.log(props.userList);
    });
    props.chatSelectionFunction({
      chatType: "DM",
      Name: userName,
    });

    if (!response.ok) {
      console.log("error");
    } else {
      console.log(response.data);
    }
    
  };
  const searchForDM = (event) => {
    event.preventDefault();
  };
  function returnDMUser(arr) {}
  return (
    <div className={styles.dm_list}>
      <div className={styles.search_button}>
        <form onSubmit={searchForDM}>
          <input type="text" className={styles.text_input} />
          <input type="submit" value="🔍" className={styles.submit} />
        </form>
      </div>
      <div className={styles.itemList}>
        { !emptyUserList &&
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
