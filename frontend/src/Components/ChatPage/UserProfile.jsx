import styles from "./chatpagestyles.module.css";
import { useEffect, useState } from "react";
import AvatarTab from "./AvatarTab";
import pic from "../../assets/bp6.png";
function UserProfile(props) {
  const [userInformation, setUserInformation] = useState({
    userName: "",
    avatar: "",
  });
  useEffect(function fetchUserProfile() {
    const fetchData = async () => {
      const response = await fetch(
        `${props.backendHttpUrl}/users/access/single-user/?user_name=${props.currentActiveUser}`
      );
      const result = response.json();
      result.then((content) => {
        setUserInformation(content);
      });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.user_profile}>
      <div className={styles.card}>
        <div className={styles.user_pic}>
          <img src={pic} />
        </div>
      </div>
      <h1>User Name: {userInformation["user_name"]}</h1>
      <div className={styles.userData}>
        <button>Groups</button>
        <button>My Trends</button>
      </div>
    </div>
  );
}

export default UserProfile;
