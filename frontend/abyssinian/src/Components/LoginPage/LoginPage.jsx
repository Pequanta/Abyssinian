import { useState } from "react";
import styles from "./loginStyles.module.css";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [userNameNotFound, setUserNameNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [formElements, setFormElements] = useState({
    username: "",
    password: "",
  });

  const handleUserName = (event) => {
    const userName = event.target.value;
    setFormElements({ ...formElements, username: userName });
  };
  const handlePassword = (event) => {
    const password_ = event.target.value;
    setFormElements({ ...formElements, password: password_ });
  };
  const sendLogInRequest = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8002/users/access/user/login?user_name=${formElements.username}&password=${formElements.password}`
    );
    if (response.ok) {
      const result = await response.json();
      if (result["message"] === "found") {
        navigate("home");
      }
      if (result["message"] === "incorrect password") {
        setWrongPassword(true);
      }
      if (result["message"] === "not found") {
        setUserNameNotFound(true);
      }
    } else {
      console.log("Server error");
    }
  };
  return (
    <div className={styles.loginCard}>
      <h1>Log In</h1>
      <form onSubmit={sendLogInRequest}>
        <div className="formElements">
          <label className="password_label">User Name</label>
          <input
            type="name"
            placeholder="username"
            className="username_input"
            name="username"
            onChange={(event) => handleUserName(event)}
          />
          {userNameNotFound && (
            <label className={styles.errorMessage}>User Name not found</label>
          )}
        </div>
        <div className="forElements">
          <label className="password_label">Password</label>
          <input
            type="password"
            placeholder="password"
            className="password_input"
            name="password"
            onChange={(event) => handlePassword(event)}
          />
          {wrongPassword && (
            <label className={styles.errorMessage}>Wrong Password</label>
          )}
        </div>
        <a href="#">forgot your password?</a>
        <div className={styles.submit_button_div}>
          <input type="submit" value="Login" className={styles.submit_button} />
        </div>
        <div>
          <span>Don't have an account ?</span>
          <a href="signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
