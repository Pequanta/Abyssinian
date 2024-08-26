import authorPic from "../../assets/bp6.png";
import styles from "./homepage.module.css";
function FeacturingCard(props) {
  return (
    <div className={styles.featuringCard}>
      <img src={authorPic} />
      <h3 className={styles.userName}>Peniel</h3>
      <div className={styles.title}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
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
