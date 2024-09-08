import styles from "./trendpage.module.css";
function TrendList(props) {
  console.log("Hello there")
  return (
    <button
      className={styles.TrendList}
      onClick={(event) => props.openTrend(event, props.trend)}
    >
      <span className={styles.userName}>{props.trend.author_username}</span>
      <span className={styles.pickAtPost}>
        {props.trend.title}
      </span>
      <div className={styles.postInfo}>
        <div className={styles.viewerInteractions}>
          <div className={styles.viewerComment}></div>
        </div>
        <span className={styles.postedTime}>{props.trend.sent_time}</span>
      </div>
    </button>
  );
}

export default TrendList;
