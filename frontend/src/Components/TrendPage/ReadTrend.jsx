import styles from "./trendpage.module.css";
import userPic from "../../assets/bp8.png";
import FollowUp from "./FollowUp";
import { useState } from "react";
function ReadTrend(props) {
  const [commentToSend, setCommentToSend] = useState({
    author_username: props.currentActiveUser,
    content: "",
    root_trend_id: props.trend._id
  });
  const handleCommentInput = (event) =>{
    const comment = event.target.value;
    setCommentToSend({...commentToSend, content: comment})
  }
  const handleCommentSubmit = async (event) =>{
    console.log(commentToSend);
    const response = await fetch(`${props.backendHttpUrl}/trends/add/followup-trend`,
      {
        method: "post",
        body: JSON.stringify(commentToSend),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )

  }
  console.log()
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
            <h3>Author: {props.trend.author_username}</h3>

            <h6>{props.trend.sent_time}</h6>
          </div>
        </div>
        <div className={styles.postContent}>
          <h3>
           Title: {props.trend.title}
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
            <textarea placeholder="Continue the trend..." onChange={(event) => handleCommentInput(event)}/>
            <button onClick={event => handleCommentSubmit(event)}>Send</button>
          </div>
          <div className={styles.commentsDisplay}>
            {props.trend.followup_trends.map((trend, index) =>(
              <FollowUp key={index} backendHttpUrl={props.backendHttpUrl} trend={trend} rootTrend={props.trend._id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadTrend;
