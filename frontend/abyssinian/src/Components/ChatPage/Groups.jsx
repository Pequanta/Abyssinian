import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import { useEffect, useState } from "react";
import pic from "../../assets/bp4.png";

function Groups() {
  const [groupsList, setGroupsList] = useState([]);
  useEffect(function fetchGroupList() {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8002/chats/access/groups/all/groups`
      );
      const result = response.json();
      result.then((content) => {
        setGroupsList([...groupsList, content[0]]);
      });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.group_page}>
      {groupsList.map((group) => (
        <AvatarTab
          profileImage={pic}
          userName={group.group_name}
          key={groupsList.indexOf(group)}
        />
      ))}
    </div>
  );
}

export default Groups;
