import styles from "./chatpagestyles.module.css";
function AvatarTab(props) {
  return (
    <div className={styles.AvatarTab}>
      <div className={styles.profilePic}>
        <img src={props.profileImage} />
      </div>
      <div>
        <h1>{props.userName}</h1>
      </div>
    </div>
  );
}
export default AvatarTab;
