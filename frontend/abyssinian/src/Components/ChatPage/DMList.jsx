import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import React, { useEffect, useState } from "react";
import pic from "../../assets/bp2.png";
function DMList() {
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
  const startConverstation = (event) => {};
  return (
    <div className={styles.dm_list}>
      {userList.map((user) => (
        <AvatarTab
          profileImage={pic}
          userName={user.group_name}
          key={userList.indexOf(user)}
          onClick={(event) => startConverstation(event)}
        />
      ))}
    </div>
  );
}

export default DMList;
