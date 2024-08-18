import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp2.png";
function DMList(props) {
  const [userList, setUserList] = useState([]);
  useEffect(function fetchDMList() {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8002/chats/access/groups/all/dms"
      );
      if (response.ok) {
        const result = response.json();
        result.then((content) => {
          setUserList([...userList, content[0]]);
        });
      } else {
        console.log("user not found");
      }
    };
    fetchData();
  }, []);
  const startConverstation = async (event, userName) => {
    console.log(userName);
    const response = await fetch(
      `http://localhost:8002/chats/access/groups/dms/${userName}?user_name=${userName}`
    );
    const result = response.json();
    result.then((content) => {
      props.chatSetterFunction(content);
    });
    console.log(props.chatDisplayed);
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
          <input type="submit" value="s" className={styles.submit} />
        </form>
      </div>
      {userList.map((user) => (
        <AvatarTab
          profileImage={pic}
          Name={"quantap"}
          key={userList.indexOf(user)}
          startConversationFunction={(event) =>
            startConverstation(event, "quantap")
          }
        />
      ))}
    </div>
  );
}

export default DMList;
