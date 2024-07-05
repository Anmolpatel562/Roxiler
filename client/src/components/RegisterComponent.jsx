import React, { useState } from "react";
import styles from "../components_css/RegisterComponent.module.css";
import { toast } from "react-toastify";
import { createNormalUser } from "../apis/noramalUser.js";
import { validatePassword } from "../utility/validatePassword.js";

const RegisterComponent = ({ setSelectedButton }) => {
  const [registerData, setRegisteredData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "NormalUser",
  });

  const registerHandler = async () => {
    if (
      registerData.name === "" &&
      registerData.name === "" &&
      registerData.address === "" &&
      registerData.password === ""
    ) {
      toast.error("Please enter all the fields.");
      return;
    } else if (registerData.name === "") {
      toast.error("Please Enter the Name First.");
      return;
    } else if (registerData.email === "") {
      toast.error("Please Enter Email First.");
      return;
    } else if (
      registerData.address === "" ||
      registerData.address.length < 30
    ) {
      if (registerData.address.length < 30) {
        toast.error("Please Enter the full address.");
        return;
      }
      toast.error("Please Enter Address First.");
      return;
    } else if (
      registerData.password === "" ||
      registerData.password.length > 16 ||
      registerData.password.length < 8
    ) {
      if (
        registerData.password.length > 16 ||
        registerData.password.length < 8
      ) {
        toast.error("Password length should be max 16 and min 8 charaters.");
        return;
      }
      toast.error("Please Enter Password First");
      return;
    }

    const hasUpperCaseHasLowerCase = await validatePassword(
      registerData.password
    );
    if (!hasUpperCaseHasLowerCase) {
      toast.error(
        "Password should have at least 1 uppercase alphabet and 1 special character"
      );
      return;
    }

    const response = await createNormalUser(registerData);
    console.log(response);

    if (response === "User with this email already registered") {
      toast.error(response);
      return;
    } else if (response === "User Registered Successfully.") {
      toast.success(response);
      setRegisteredData({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "NormalUser",
      });
      setSelectedButton({
        name: "login",
        loginCss:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        signUpCss: "",
      });
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Register Form</div>
        <div style={{ fontWeight: "600", color: "green", fontSize: "14px" }}>
          Normal User only
        </div>
      </div>

      <div className={styles.formInputFieldsContainer}>
        <div className={styles.labelInputField}>
          <label>Name</label>
          <input
            className={styles.inputField}
            type="text"
            value={registerData.name}
            onChange={(e) =>
              setRegisteredData({
                ...registerData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.labelInputField}>
          <label>Email</label>
          <input
            className={styles.inputField}
            type="email"
            value={registerData.email}
            onChange={(e) =>
              setRegisteredData({
                ...registerData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.labelInputField}>
          <label>Address</label>
          <input
            className={styles.inputField}
            type="address"
            value={registerData.address}
            onChange={(e) =>
              setRegisteredData({
                ...registerData,
                address: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.labelInputField}>
          <label>Password</label>
          <input
            className={styles.inputField}
            type="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisteredData({
                ...registerData,
                password: e.target.value,
              })
            }
          />
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
          >
            <option value="NormalUser">Normal User</option>
          </select>
        </div>
      </div>
      <div className={styles.loginButton} onClick={registerHandler}>
        <div>Register</div>
      </div>
    </div>
  );
};

export default RegisterComponent;
