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
            <h3>Author: Peniel</h3>

            <h6>date: jul, 16, 2024 00:00:00pm</h6>
          </div>
        </div>
        <div className={styles.postContent}>
          <h3>
            Title: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
        <div className={styles.viewersReaction}>
          <div className={styles.reactions}>
            <button>👍</button>
            <h2>12</h2>
          </div>
          <div className={styles.reactions}>
            <button>🏹</button>
            <h2>12</h2>
          </div>
          <div className={styles.reactions}>
            <button>💬</button>
            <h2>12</h2>
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
