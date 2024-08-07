import { useState } from "react";
import styles from "./loginStyles.module.css";
function LoginPage() {
  const [userInfo, setUserInfo] = useState({});
  async function logInRequest(event) {
    const inputData = event.target.name;
    const inputVal = event.target.value;
    setUserInfo((values) => ({ ...values, [inputData]: inputVal }));
    const status = await fetch("http://localhost");
  }
  return (
    <div className={styles.loginCard}>
      <h1>Log In</h1>
      <form method="logIn()">
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
          <a href="#">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
