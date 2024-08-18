import styles from "./chatpagestyles.module.css";
function AvatarTab(props) {
  return (
    <button
      className={styles.AvatarTab}
      onClick={props.startConversationFunction}
    >
      <div className={styles.profilePic}>
        <img src={props.profileImage} />
      </div>
      <div>
        <h1>{props.Name}</h1>
      </div>
    </button>
  );
}
export default AvatarTab;
