import styles from "./SignUp.module.css";
import { useState } from "react";
function SignUpPage() {
  const [userInfo, setUserInfo] = useState({});
  async function logInRequest(event) {
    const inputData = event.target.name;
    const inputVal = event.target.value;
    setUserInfo((values) => ({ ...values, [inputData]: inputVal }));
    const status = await fetch("http://localhost");
  }
  return (
    <div className={styles.signUpCard}>
      <h1>Sign Up</h1>
      <form method="signUp()">
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
        <div className={styles.submit_button_div}>
          <input
            type="submit"
            value="Sign up"
            className={styles.submit_button}
          />
        </div>
        <div>
          <span>Already have an account ?</span>
          <a href="/">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
