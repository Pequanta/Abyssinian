import styles from "./chatpagestyles.module.css";
import { useState } from "react";
import { MdRadioButtonChecked } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function NewChat(props) {
  const [newChat, setNewChat] = useState({
    name: "",
    type: "GROUP",
  });

  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const [selectedGroupCreation, setSelectedGroupCreation] = useState("create")
  const handleSelectionChange = (event) => {
    setNewChat({ ...newChat, type: event.target.value });
  };

  const handleNameValue = (event) => {
    setNewChat({ ...newChat, name: event.target.value });
  };
  const handleGroupCreationChange = (event) =>{
    const val = event.target.value;
    setSelectedGroupCreation(val);
  }
  const handleSubmission = (event) => {
    event.preventDefault();
    console.log(newChat);
    if (newChat["type"] === "GROUP") {
      if(selectedGroupCreation ==="join"){
        const response = fetch(
          `${props.backendHttpUrl}/users/create/group/new-user?group_name=${newChat["name"]}&user_name=${props.currentActiveUser}`,
          {method: "post"}
        )
      }else if(selectedGroupCreation === "create"){
        const response = fetch(
          `${props.backendHttpUrl}/chats/create-new-chat/group/${newChat["name"]}?group_name=${newChat["name"]}&current_user=${props.currentActiveUser}`,
          { method: "post" }
        );
        navigate("/chat/group-page");
      }
    } else if (newChat["type"] === "DM") {
      const response = fetch(
        `${props.backendHttpUrl}/chats/create-new-chat/dm/${newChat["name"]}?user_name=${newChat["name"]}&current_user=${props.currentActiveUser}`,
        { method: "post" }
      );
    }
  };
  return (
    <div className={styles.newChatContainer}>
      <h1>Start New Conversation</h1>
      <hr />
      <div className={styles.selectionBox}>
        <label htmlFor="options">
          Chat Type
          <select
            className={styles.selectionBox}
            name="options"
            onChange={(event) => handleSelectionChange(event)}
          >
            <option value="GROUP">Group</option>
            <option value="DM">Direct Message</option>
          </select>
        </label>
      </div>
      {newChat["type"] === "GROUP" && (
        <div>
          <form onSubmit={(event) => handleSubmission(event)}>
            <div className={styles.nameContainer}>
              <label>
                ChatRoom name
                <input
                  type="text"
                  placeholder="name"
                  onChange={(event) => handleNameValue(event)}
                />
              </label>
            </div>
            <div className={styles.radioButtons}>
              <label><input
                type="radio"
                value="create"
                checked={selectedGroupCreation === "create"}
                onChange={(event) => handleGroupCreationChange(event)}
              />Create</label>
              <label><input
                type="radio"
                value="join"
                checked={selectedGroupCreation === "join"}
                onChange={(event) => handleGroupCreationChange(event)}
              />Join</label>
            </div>

            <div className={styles.submitButton}>
              <input type="submit" value="continue" />
            </div>
          </form>
        </div>
      )}
      {newChat["type"] === "DM" && (
        <div>
          <form onSubmit={(event) => handleSubmission(event)}>
            <div className={styles.nameContainer}>
              <label>
                username
                <input
                  type="text"
                  placeholder="User Name"
                  onChange={(event) => handleNameValue(event)}
                />
              </label>
            </div>
            <div className={styles.submitButton}>
              <input type="submit" value="start" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewChat;
