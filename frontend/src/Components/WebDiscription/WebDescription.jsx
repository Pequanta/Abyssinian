import styles from "./WebDescription.module.css";
import { VscGithubAlt } from "react-icons/vsc";
import { VscTwitter } from "react-icons/vsc";
import { VscCommentUnresolved } from "react-icons/vsc";
import { VscFeedback } from "react-icons/vsc";
import { VscGithub } from "react-icons/vsc";
import { VscSmiley } from "react-icons/vsc";
import { VscVerified } from "react-icons/vsc";
import { VscVerifiedFilled } from "react-icons/vsc";
import { VscTools } from "react-icons/vsc";
import { VscCheck } from "react-icons/vsc";
import { VscCheckAll } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscMail } from "react-icons/vsc";
import { VscPlayCircle } from "react-icons/vsc";
function WebDescription() {
  return (
    <div className={styles.page_container}>
      <main>
        <div className={styles.welcome_card}>
          <h1>Abyssinian-Chat</h1>
          <h2>Welcome to Abyssinian</h2>
          <h3>
            This is a chat and trend site where users can post trends
            and have a chat with each other. Beside serving as a chat 
            application, the aim is to create a public repository where 
            chats will be stored with their emotive tags. The repository 
            will be accessible to any member. 
          </h3>
          <div>
            <h5>Developed By: <a href="#">Peniel Yohannes</a></h5>
            <h5>Public Repository: <a href="#">public repo</a></h5>
          </div>
        </div>
      </main>
      <footer>
        <div className={styles.footerContacts}>
          <h1>Contacts</h1>
          <ul>
            <li>
              <div className={styles.links}>
                <VscGithubAlt className={styles.icons} />
                <a>Github</a>
              </div>
            </li>
            <li>
              <div className={styles.links}>
                <VscMail className={styles.icons} />
                <a>GMail</a>
              </div>
            </li>

            <li>
              <div className={styles.links}>
                <VscPlayCircle className={styles.icons} />
                <a>Youtube</a>
              </div>
            </li>
            <li>
              <div className={styles.links}>
                <VscAccount className={styles.icons} />
                <a>Account</a>
              </div>
            </li>
            <li>
              <div className={styles.links}>
                <VscTwitter className={styles.icons} />
                <a>Twitter</a>
              </div>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default WebDescription;
