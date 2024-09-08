import styles from "./chatpagestyles.module.css";
import profilePic from "../../assets/bg9.png";
function ChatCard(props) {
  return (
    <div className={`${props.senderName === props.currentActiveUser? styles.chatCardMe: styles.chatCardAnother}`}>
      <div className={styles.user_profile}>
        <img alt="profile" src={profilePic} />
      </div>
      <div className={styles.content}>
        <div>
          <span className={styles.userName}>{props.senderName}</span>
        </div>
        <p className={styles.chatContent}>{props.content}</p>
        <div>
          <span className={styles.sentTime}>{props.sentTime}</span>
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
