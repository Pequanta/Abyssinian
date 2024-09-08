import styles from "./trendpage.module.css";
import {useState} from "react";
import { useNavigate} from "react-router-dom";
function NewTrend(props) {
  console.log(props.currentActiveUser)
  const [trendToPost, setTrendToPost] = useState({
    author_username: props.currentActiveUser,
    title: "",
    tags: [],
    content: ""
  })

  const navigate = useNavigate();
  const handleNewTrendContent = (event) =>{
      console.log(event)
      const content = event.target.value;
      setTrendToPost({
        ...trendToPost, content: content
      })
  }

  const handleNewTrendTitle = (event) =>{
    const title = event.target.value;
    setTrendToPost({
      ...trendToPost, title: title
    })
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const response = await fetch(`http://localhost:8002/trends/new-trend`,
      {
        method: "post",
        body: JSON.stringify(trendToPost),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    props.setTrendPosition("to-main");
    props.backFromNewTrend(event)

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
            <input type="text" placeholder="..." onChange={(event) => handleNewTrendTitle(event)} required/>
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
