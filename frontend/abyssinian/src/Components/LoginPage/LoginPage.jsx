import { useState } from "react";
import styles from "./loginStyles.module.css";
function LoginPage() {
  const [userInfo, setUserInfo] = useState({});

  const [formElements, setFormElements] = useState({
    user_name: "",
    password: "",
  });

  const handleUserName = (event) => {
    const userName = event.target.textContent;
    setFormElements({ user_name: userName });
  };
  const handlePassword = (event) => {
    const password = event.target.textContent;
    setFormElements({ password: userName });
  };
  const sendLogInRequest = async (event) => {
    event.preventDefault();
    console.log("tried this");
    return <h1>successful</h1>;
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
          />
        </div>
        <div className="forElements">
          <label className="password_label">Password</label>
          <input
            type="password"
            placeholder="password"
            className="password_input"
            name="password"
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
