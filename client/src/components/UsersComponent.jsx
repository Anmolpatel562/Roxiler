import React from "react";
import Chip from "./Chips.jsx";
import styles from "../components_css/UserComponent.module.css";

const UsersComponent = ({ allUserDetails }) => {
  return (
    <>
    <div style={{ fontSize: "30px",fontWeight:"600" }}>Users </div>
    <div className={styles.usersContainer}>
      {allUserDetails.map((user) => {
        return <Chip key={user._id} user={user}></Chip>;
      })}
    </div>
    </>
    
  );
};

export default UsersComponent;
