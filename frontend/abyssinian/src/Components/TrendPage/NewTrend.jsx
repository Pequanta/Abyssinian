import styles from "./trendpage.module.css";
function NewTrend(props) {
  return (
    <div className={styles.newTrendPostDisplay}>
      <div className={styles.backButton}>
        <button
          onClick={(event) => props.backFromNewTrend(event)}
          className={styles.backButton}
        >
          ⬅️Back
        </button>
      </div>
      <div className={styles.postContentHandlers}>
        <textarea
          className={styles.newPostContent}
          placeholder="start your trend..."
        />
        <form>
          <label>
            Title
            <input type="text" placeholder="..." />
          </label>
          <button className={styles.newPostButton}>post</button>
        </form>
        <div className={styles.newPostTags}>
          <h2>Tag options will be here</h2>
        </div>
      </div>
    </div>
  );
}

export default NewTrend;
