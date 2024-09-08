import { useState, useEffect } from "react";
import styles from "./loginStyles.module.css";
import { useNavigate } from "react-router-dom";
function LoginPage(props) {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const [wrongCredential, setWrongCredential] = useState(false);
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
  async function getCurrentUser(token) {
    const response = await fetch(
      `http://localhost:8002/users/access/user/current-user?token=${token}`,
      {
        method: "get",
      }
    );
    const result = await response.json();
    props.setCurrentActiveUser(result);
  }
  const sendLogInRequest = async (event) => {
    event.preventDefault();
    const userData = {
      user_name: formElements.username,
      password: formElements.password,
    };
    try {
      const response = await fetch(
        "http://localhost:8002/users/access/user/login?",
        {
          method: "post",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }

      );
      if (response.ok) {
        const result = await response.json();
        console.log(result["token"]);
        props.setToken(result["token"]);
        if (result["message"] === "found" && result["token"].length != 0) {
          getCurrentUser(result["token"]);
          navigate("home");
        }
        if (result["message"] === "incorrect credential") {
          setWrongCredential(true);
        }
      } else {
        console.log("Server error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.loginCard}>
      <h1>Log In</h1>
      <form onSubmit={sendLogInRequest}>
        <div className="formElements">
          {wrongCredential && (
            <label className={styles.errorMessage}>
              User Name and Password combination is wrong
            </label>
          )}
          <br></br>
          <label className="password_label">User Name</label>
          <input
            type="name"
            placeholder="username"
            className="username_input"
            name="username"
            onChange={(event) => handleUserName(event)}
          />
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
