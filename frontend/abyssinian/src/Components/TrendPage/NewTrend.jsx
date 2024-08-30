import styles from "./trendpage.module.css";

function NewTrend(props) {
  const [trendContent, setTrendContent] = useState();
  const [trendTitle, setTrendTitle] = useState();
  const handleNewTrendContent = (event) =>{
      const content = event.target.value;
      setTrendContent(content);
  }

  const handleNewTrendTitle = (event) =>{
    const title = event.target.value;
    setTrendTitle(title);
  }
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
          onChange={(event) = handleNewTrendContent(event)}
          placeholder="start your trend..."
        />
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Title
            <input type="text" placeholder="..." onChange={(event) => handleNewTrendTitle(event)}/>
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
