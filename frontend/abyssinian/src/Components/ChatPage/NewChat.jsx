import styles from "./chatpagestyles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NewChat() {
  const [newChat, setNewChat] = useState({
    name: "",
    type: "GROUP",
  });

  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(false);
  const handleSelectionChange = (event) => {
    setNewChat({ ...newChat, type: event.target.value });
  };

  const handleNameValue = (event) => {
    setNewChat({ ...newChat, name: event.target.value });
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    console.log(newChat);
    if (newChat["type"] === "GROUP") {
      const response = fetch(
        `http://localhost:8002/chats/create-new-chat/group/${newChat["name"]}?group_name=${newChat["name"]} `,
        { method: "post" }
      );
    } else if (newChat["type"] === "DM") {
      const response = fetch(
        `http://localhost:8002/chats/create-new-chat/dm/${newChat["name"]}?user_name=${newChat["name"]}`,
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

            <div className={styles.submitButton}>
              <input type="submit" value="create" />
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
