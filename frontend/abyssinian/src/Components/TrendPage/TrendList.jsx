import styles from "./trendpage.module.css";
function TrendList(props) {
  return (
    <button
      className={styles.TrendList}
      onClick={(event) => props.openTrend(event)}
    >
      <span className={styles.userName}>author: peniel</span>
      <span className={styles.pickAtPost}>
        title: Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </span>
      <div className={styles.postInfo}>
        <div className={styles.viewerInteractions}>
          <div className={styles.viewerComment}></div>
        </div>
        <span className={styles.postedTime}>00:00:00PM</span>
      </div>
    </button>
  );
}

export default TrendList;
