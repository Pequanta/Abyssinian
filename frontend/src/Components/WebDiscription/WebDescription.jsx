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
          <h1>Nerd Camp</h1>
          <h2>Welcome to Nerd Camp</h2>
          <p>
            Ea amet irure deserunt eu aute dolor ad consequat laborum mollit
            pariatur dolore. Sunt Lorem dolor dolor est magna velit mollit id
            nisi officia officia ut qui ullamco. Dolor consectetur ipsum do
            occaecat. Dolor occaecat anim exercitation tempor aliquip voluptate
            laborum. Non elit fugiat eu consectetur dolor ea mollit dolore
            labore quis sint velit sit labore. Ea dolor eu aliqua excepteur qui
            sit deserunt ut. Amet incididunt dolor eiusmod enim excepteur dolor
            id officia aliquip magna pariatur. Anim deserunt incididunt est
            cupidatat duis aliquip eu. Esse duis occaecat laborum amet ut sit
            dolore sunt. Deserunt in cillum et dolore minim magna sit ea irure
            excepteur occaecat. Nisi cillum ea cupidatat eiusmod. Tempor est
            amet irure quis amet magna. Ut nostrud non ipsum Lorem aliquip velit
            irure sit incididunt sunt ad anim laborum. Laboris amet sunt velit
            cupidatat occaecat reprehenderit exercitation aliquip dolor ut et
            aliqua amet. Est incididunt eiusmod ex fugiat est sit ullamco id sit
            est. Aliqua proident aute id culpa. Nostrud anim laboris voluptate
            non. Esse proident aute anim sit excepteur cillum anim fugiat. In
            anim deserunt ad cupidatat dolor id et quis quis in eu. Nisi duis
            est ex sunt laboris officia. In sint ad est et consequat duis
            deserunt do duis aliqua laboris aliquip laborum ipsum.
          </p>
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
