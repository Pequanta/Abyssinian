import styles from "./chatpagestyles.module.css";
import { useEffect, useState } from "react";
import AvatarTab from "./AvatarTab";
import pic from "../../assets/bp6.png";
function UserProfile() {
  const [userInformation, setUserInformation] = useState({
    userName: "",
    avatar: "",
  });
  useEffect(function fetchUserProfile() {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8002/users/access/single-user/?user_name=peniel`
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
    </div>
  );
}

export default UserProfile;
