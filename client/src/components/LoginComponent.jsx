import React, { useState } from "react";
import styles from "../components_css/LoginComponent.module.css";
import { toast } from "react-toastify";
import { loginNormalUser } from "../apis/noramalUser";
import { loginAdmin } from "../apis/admin";
import { loginStoreOwner } from "../apis/storeOwner";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const loginHandler = async () => {
    console.log(loginData);
    if (loginData.email === "" && loginData.password === "") {
      toast.error("Email & Password is empty.");
      return;
    } else if (loginData.email === "") {
      toast.error("Email is empty.");
      return;
    } else if (loginData.password === "") {
      toast.error("Password is empty.");
      return;
    } else if (loginData.role === "") {
      toast.error("Please select the user role.");
      return;
    }
    var response = "";
    if (loginData.role === "NormalUser") {
      response = await loginNormalUser(loginData);
    } else if (loginData.role === "StoreOwner") {
      response = await loginStoreOwner(loginData);
    } else {
      response = await loginAdmin(loginData);
    }
    console.log(response);
    if (response === "Invalid credentials") {
      toast.error(response);
      return;
    } else if (response === "Invalid Email") {
      toast.error(response);
      return;
    } else if (response === "User Logged In Successfully") {
      toast.success(response);
      const user = {
        email: loginData.email,
        role: loginData.role,
      };
      localStorage.setItem("User", JSON.stringify(user));
      navigate("/homepage");
      return;
    } else {
      toast.error(response);
      return;
    }
  };

  return (
    <div className={styles.topContainer}>
      <div
        style={{
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        Login Form
      </div>

      <div className={styles.formInputFieldsContainer}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className={styles.labelInputField}>
            <label>Email</label>
            <input
              className={styles.inputField}
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.labelInputField}>
            <label>Password</label>
            <input
              className={styles.inputField}
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className={styles.labelInputField}>
          <div>Role</div>
          <select
            name="role"
            style={{
              border: "none",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              borderRadius: "5px",
              height: "27px",
              padding: ".2rem",
              outline: "none",
            }}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                role: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            <option value="Admin">Admin</option>
            <option value="NormalUser">Normal User</option>
            <option value="StoreOwner">Store Owner</option>
          </select>
        </div>
      </div>
      <div className={styles.loginButton} onClick={loginHandler}>
        <div>Login</div>
      </div>
    </div>
  );
};

export default LoginComponent;
