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
import { FaDiscord } from "react-icons/fa";
import { VscPlayCircle } from "react-icons/vsc";
import logo from "../../assets/default.png"
function WebDescription() {
  return (
    <div className={styles.page_container}>
      <main>
        <div className={styles.welcome_card}>
          <h1>Abyssinian-Chat</h1>
          <img alt="logo" src={logo} className={styles.logo}/>
          <h2>Welcome to Abyssinian</h2>
          <h3>
            This is a chat and trend site where users can post trends
            and have a chat with each other. Beside serving as a chat 
            application, the aim is to create a public repository where 
            chats will be stored with their emotive tags. The repository 
            will be accessible to any member. 
          </h3>
          <div>
            <h5>Developed By: <a href="https://github.com/Pequanta" target="_blank">Peniel Yohannes</a></h5>
            <h5>Public Repository: <a href="https://github.com/penielQ/AbyssinianDataset/tree/main" target="_blank">public repo</a></h5>
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
                <a href="https://github.com/Pequanta" target="_blank">Github</a>
              </div>
            </li>
            <li>
              <div className={styles.links}>
                <FaDiscord className={styles.icons} />
                <a href="https://discord.com/channels/1288820215895031878/1288820215895031881" target="_blank">Discord</a>
              </div>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default WebDescription;
