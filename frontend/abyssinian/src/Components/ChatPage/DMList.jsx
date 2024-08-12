import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
function DMList() {
  const [userList, setUserList] = useState([]);
  useEffect(async function fetchDMList() {
    const response = fetch("http://localhost:8002/chats/access/groups/dms/all");
    if (response.ok) {
      const result = (await response).json();
      setUserList([result]);
    } else {
      console.log("user not found");
    }
  }, []);
  {
    <div className={styles.data_cont}>
      {userList.map((user) => {
        return <li>{user}</li>;
      })}
    </div>;
  }
}

export default DMList;
