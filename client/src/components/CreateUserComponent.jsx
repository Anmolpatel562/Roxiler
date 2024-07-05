import React, { useState } from "react";
import styles from "../components_css/CreateUserComponent.module.css";
import { toast } from "react-toastify";
import { createNormalUser } from "../apis/noramalUser.js";
import { createStoreOwner } from "../apis/storeOwner.js";
import { validatePassword } from "../utility/validatePassword.js";

const CreateUserComponent = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "NormalUser",
  });

  const createUser = async () => {
    console.log(user.role)
    if (
      user.name === "" &&
      user.name === "" &&
      user.address === "" &&
      user.password === ""
    ) {
      toast.error("Please enter all the fields.");
      return;
    } else if (user.name === "") {
      toast.error("Please Enter the Name First.");
      return;
    } else if (user.email === "") {
      toast.error("Please Enter Email First.");
      return;
    } else if (user.address === "" || user.address.length < 30) {
      if (user.address.length < 30) {
        toast.error("Please Enter the full address.");
        return;
      }
      toast.error("Please Enter Address First.");
      return;
    } else if (
      user.password === "" ||
      user.password.length > 16 ||
      user.password.length < 8
    ) {
      if (user.password.length > 16 || user.password.length < 8) {
        toast.error("Password length should be max 16 and min 8 charaters.");
        return;
      }
      toast.error("Please Enter Password First");
      return;
    }

    const hasUpperCaseHasLowerCase = await validatePassword(user.password);
    if (!hasUpperCaseHasLowerCase) {
      toast.error(
        "Password should have at least 1 uppercase alphabet and 1 special character"
      );
      return;
    }
    
    if (user.role === "StoreOwner") {
      const response = await createStoreOwner(user);
      if (response === "User with this email already registered") {
        toast.error(response);
        return;
      } else if (response === "User Registered Successfully.") {
        toast.success(response);
        setUser({
          name: "",
          email: "",
          address: "",
          password: "",
          role: "NormalUser",
        });
        return;
      } else {
        toast.error(response);
        return;
      }
      return;
    }

    const response = await createNormalUser(user);
    console.log(response);

    if (response === "User with this email already registered") {
      toast.error(response);
      return;
    } else if (response === "User Registered Successfully.") {
      toast.success(response);
      setUser({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "NormalUser",
      });
      return;
    } else {
      toast.error(response);
      return;
    }
  };

  return (
    <div>
      <div style={{ fontSize: "50px", marginBottom: "5rem" }}>
        User Creation
      </div>
      <div className={styles.topContainer}>
        <div className={styles.roleBox}>
          <label style={{ fontSize: "25px" }}>Role</label>
          <select onChange={(e) => setUser({ ...user, role: e.target.value })}>
            <option value="NormalUser">Normal User</option>
            <option value="StoreOwner">Store Owner</option>
          </select>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formFields}>
            <label className={styles.labelText}>Name</label>
            <input
              type="text"
              className={styles.inputFields}
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formFields}>
            <label className={styles.labelText}>Email</label>
            <input
              type="text"
              className={styles.inputFields}
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formFields}>
            <label className={styles.labelText}>Address</label>
            <input
              type="text"
              className={styles.inputFields}
              value={user.address}
              onChange={(e) =>
                setUser({
                  ...user,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.formFields}>
            <label className={styles.labelText}>Password</label>
            <input
              type="text"
              className={styles.inputFields}
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div onClick={createUser}>Create</div>
    </div>
  );
};

export default CreateUserComponent;
