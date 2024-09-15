import styles from "./trendpage.module.css";
function TrendList(props) {
  return (
    <button
      className={styles.TrendList}
      onClick={(event) => props.openTrend(event, props.trend)}
    >
      <span className={styles.userName}>Author: {props.trend.author_username}</span>
      <span className={styles.pickAtPost}>
        Title: {props.trend.title}
      </span>
      <div className={styles.postInfo}>
        <div className={styles.viewerInteractions}>
          <div className={styles.viewerComment}></div>
        </div>
        <span className={styles.postedTime}>sent time: {props.trend.sent_time}</span>
      </div>
    </button>
  );
}

export default TrendList;
