import styles from "./chatpagestyles.module.css";
import profilePic from "../../assets/bg9.png";
function ChatCard(props) {
  return (
    <div className={styles.chatCard}>
      <div className={styles.user_profile}>
        <img alt="profile" src={profilePic} />
      </div>
      <div className={styles.content}>
        <p className={styles.chatContent}>{props.content}</p>
        <div className={styles.sentTime}>00:00:00</div>
      </div>
    </div>
  );
}

export default ChatCard;
