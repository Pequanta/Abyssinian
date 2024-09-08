import styles from "./trendpage.module.css";
import userPic from "../../assets/bp8.png";
function ReadTrend(props) {
  return (
    <div className={styles.postDisplayCard}>
      <div className={styles.backButton}>
        <button
          onClick={(event) => props.backFromTrend(event)}
          className={styles.backButton}
        >
          ⬅️Back
        </button>
      </div>
      <div
        className={styles.postDisplayCardContent}
        id="postDisplayCardContent"
      >
        <div className={styles.postHeadings}>
          <div className={styles.userInfo}>
            <img src={userPic} />
          </div>
          <div className={styles.postInfo}>
            <h3>{props.trend.author_username}</h3>

            <h6>date: jul, 16, 2024 {props.trend.sent_time}</h6>
          </div>
        </div>
        <div className={styles.postContent}>
          <h3>
           {props.trend.title}
          </h3>
          <p>
            {props.trend.content}
          </p>
        </div>
        <div className={styles.viewersReaction}>
          <div className={styles.reactions}>
            <button>👍</button>
            <span>{props.trend.reactions["likes"]}</span>
          </div>
          <div className={styles.reactions}>
            <button>🏹</button>
            <span>{props.trend.reactions["share"]}</span>
          </div>
          <div className={styles.reactions}>
            <button>💬</button>
            <span>{props.trend.reactions["comments"]}</span>
          </div>
        </div>
        <div className={styles.commentSection}>
          <div className={styles.commentTextArea}>
            <textarea placeholder="Continue the trend..." />
            <button>Send</button>
          </div>
          <div className={styles.commentsDisplay}></div>
        </div>
      </div>
    </div>
  );
}

export default ReadTrend;
