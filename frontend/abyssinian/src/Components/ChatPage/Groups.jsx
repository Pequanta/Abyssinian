import AvatarTab from "./AvatarTab";
import styles from "./chatpagestyles.module.css";
import { useEffect, useState } from "react";
import pic from "../../assets/bp4.png";

function Groups(props) {
  const [groupsList, setGroupsList] = useState([]);
  useEffect(function fetchGroupList() {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8002/chats/access/groups/all/groups`
      );
      const result = response.json();
      result.then((content) => {
        console.log(content);
        if (!(content[0] in groupsList)) {
          console.log(groupsList);
          setGroupsList([...groupsList, content[0]]);
        }
      });
    };
    fetchData();
  }, []);
  const searchForDM = (event) => {
    event.preventDefault();
  };
  const startConverstation = async (event, groupName) => {
    const response = await fetch(
      `http://localhost:8002/chats/access/groups/group/${groupName}?group_name=${groupName}`
    );
    const result = response.json();
    props.chatSelectionFunction({
      chatType: "GROUP",
      Name: groupName,
    });
    result.then((content) => {
      props.chatSetterFunction(content);
    });
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
          <input type="submit" value="s" className={styles.submit} />
        </form>
      </div>
      {groupsList.map((group) => (
        <AvatarTab
          profileImage={pic}
          Name={group.group_name}
          key={groupsList.indexOf(group)}
          startConversationFunction={(event) =>
            startConverstation(event, "loosers")
          }
        />
      ))}
    </div>
  );
}

export default Groups;
