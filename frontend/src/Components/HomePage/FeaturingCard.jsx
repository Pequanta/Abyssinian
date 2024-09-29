import authorPic from "../../assets/bp6.png";
import styles from "./homepage.module.css";
function FeacturingCard(props) {
  return (
    <div className={styles.featuringCard}>
      <img src={authorPic} />
      <h3 className={styles.userName}>{trend.author_username}</h3>
      <div className={styles.title}>
        <p>
          {
            props.trend.content.slice(0, 16)
          }
        </p>
      </div>
      <div>
        <button className={styles.readButton} onClick={props.openPostFunction}>
          Read more
        </button>
      </div>
    </div>
  );
}

export default FeacturingCard;
