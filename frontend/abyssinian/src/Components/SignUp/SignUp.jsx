import styles from "./SignUp.module.css";
import { useState } from "react";
function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
  });
  const handleUserNameChanges = (event) => {
    const user_ = event.target.value;
    setUserInfo({ ...userInfo, userName: user_ });
  };
  const handlePasswordChanges = (event) => {
    const password_ = event.target.value;
    setUserInfo({ ...userInfo, password: password_ });
  };
  const sendSignUpRequest = async (event) => {
    const response = await fetch(
      `http://localhost:8002/access/user?user_name=${userInfo.userName}&password=${userInfo.password}`
    );
    if (response.ok) {
    }
  };
  return (
    <div className={styles.signUpCard}>
      <h1>Sign Up</h1>
      <form onSubmit={sendSignUpRequest}>
        <div className="formElements">
          <label className="password_label">User Name</label>
          <input
            type="name"
            placeholder="username"
            className="username_input"
            name="username"
            onChange={(event) => {
              handleUserNameChanges;
            }}
          />
        </div>
        <div className="forElements">
          <label className="password_label">Password</label>
          <input
            type="password"
            placeholder="password"
            className="password_input"
            name="password"
            onChange={(event) => handlePasswordChanges(event)}
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
