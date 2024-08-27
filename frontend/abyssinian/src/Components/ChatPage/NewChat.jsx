import styles from "./chatpagestyles.module.css";
import { useState } from "react";

function NewChat() {
  const [selectedPage, setSelectedPage] = useState("newGroup");
  const handleSelectionChange = (event) => {
    const selected = event.target.value;
    setSelectedPage(selected);
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
            <option value="newGroup">Group</option>
            <option value="newDM">Direct Message</option>
          </select>
        </label>
      </div>
      {selectedPage === "newGroup" && (
        <div>
          <form>
            <div className={styles.nameContainer}>
              <label>
                ChatRoom name
                <input type="text" placeholder="name" />
              </label>
            </div>

            <div className={styles.submitButton}>
              <input type="submit" value="create" />
            </div>
          </form>
        </div>
      )}
      {selectedPage === "newDM" && (
        <div>
          <form>
            <div className={styles.nameContainer}>
              <label>
                username
                <input type="text" placeholder="Group Name" />
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
