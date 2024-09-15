import { useState } from "react";
import styles from "./trendpage.module.css"
function FollowUp(props){
    const [addUserLike, setAddUserLike] = useState(0);
    const handleAddUserLike = async (event) => {
        const response = await fetch(`${props.backendHttpUrl}/trends/update-reaction/likes?trend_id=${props.trend._id}&root_id=${props.rootTrend}&type=FOLLOWUP`, 
            {method: "post"}
        )
        setAddUserLike(1);
    }
    
    return(
        <div className={styles.followUpContainer}>
            <span className={styles.metaData}>{props.trend.author_username}</span>
            <p className={styles.contentData}>
                {props.trend.content}
            </p>
            <span className={styles.metaData}>{props.trend.sent_time}</span>
           <div className={styles.viewersReaction}>
                <div className={styles.reactions}>
                    <button onClick={(event) => handleAddUserLike(event)}>👍</button>
                    <span>{props.trend.reactions["likes"] + addUserLike}</span>
                </div>
            </div>
        </div>
    )
}
export default FollowUp;