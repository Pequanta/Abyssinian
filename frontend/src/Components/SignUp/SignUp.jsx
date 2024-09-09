import { Link, NavLink } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUpPage(props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    user_name: "",
    password: "",
  });
  const [signUpState, setSignUpState] = useState(true);
  const handleUserNameChanges = (event) => {
    const user_ = event.target.value;
    setUserInfo({ ...userInfo, user_name: user_ });
  };
  const handlePasswordChanges = (event) => {
    const password_ = event.target.value;
    setUserInfo({ ...userInfo, password: password_ });
  };
  const sendSignUpRequest = async (event) => {
    console.log(userInfo);
    event.preventDefault();
    const response = await fetch(`${props.backendHttpUrl}/users/create/user`, {
      method: "post",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setSignUpState(false);
    } else {
      navigate("/");
    }
  };
  return (
    <div className={styles.signUpCard}>
      <h1>Sign Up</h1>
      {!signUpState && (
        <div className={styles.errorMessage}>Couldn't sign up</div>
      )}
      <form onSubmit={sendSignUpRequest}>
        <div className="formElements">
          <label className="password_label">User Name</label>
          <input
            type="name"
            placeholder="username"
            className="username_input"
            name="username"
            onChange={(event) => handleUserNameChanges(event)}
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
            className={styles.submit_button}
            type="submit"
            value="Sign up"
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
