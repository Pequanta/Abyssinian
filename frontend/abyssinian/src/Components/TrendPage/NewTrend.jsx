import styles from "./trendpage.module.css";
import {useState} from "react";
function NewTrend(props) {
  const [trendContent, setTrendContent] = useState();
  const [trendTitle, setTrendTitle] = useState();
  const handleNewTrendContent = (event) =>{
      console.log(event)
      const content = event.target.value;
      setTrendContent(content);
  }

  const handleNewTrendTitle = (event) =>{
    const title = event.target.value;
    setTrendTitle(title);
  }

  const handleSubmit = (event) =>{
    
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
          placeholder="start your trend..."
          onChange={handleNewTrendContent}
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
