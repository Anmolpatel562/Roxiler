import React, { useState } from "react";
import styles from "../pages_css/LoginPage.module.css";
import loginImg from "../assets/background.png";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

const LoginPage = () => {
  const [selectedButton, setSelectedButton] = useState({
    name: "login",
    loginCss:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    signUpCss: "",
  });
  const loginButtonHandler = () => {
    setSelectedButton({
      name: "login",
      signUpCss: "",
      loginCss:
        "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    });
  };
  const signUpButtonHandler = () => {
    setSelectedButton({
      name: "signUp",
      loginCss: "",
      signUpCss:
        "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    });
  };
  return (
    <div className={styles.topContainer}>
      <div className={styles.imagePartLeft}>
        <div style={{ position: "relative" }}>
          <img className={styles.loginImage} src={loginImg} />
          <div className={styles.welcomeText}>
            <div>Welcome Back !</div>
            <div>Rate and Manage Your Stores</div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.innerFormContainer}>
          <div className={styles.userLoginSignUpSelectedBox}>
            <div
              className={styles.login}
              onClick={loginButtonHandler}
              style={{
                boxShadow: selectedButton.loginCss,
              }}
            >
              Login
            </div>
            <div
              className={styles.register}
              style={{
                boxShadow: selectedButton.signUpCss,
              }}
              onClick={signUpButtonHandler}
            >
              Sign in
            </div>
          </div>
          <div className={styles.loginSignUpContainer}>
            {selectedButton.name === "login" ? (
              <LoginComponent></LoginComponent>
            ) : (
              <RegisterComponent  setSelectedButton={setSelectedButton}></RegisterComponent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
