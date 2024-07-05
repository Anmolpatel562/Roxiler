import React from "react";
import Chip from "../components/Chips.jsx";
import styles from "../components_css/StoreComponent.module.css";

const StoreComponent = ({ allStoresData }) => {
  return (
    <>
      <div style={{ fontSize: "30px",fontWeight:"600" }}>Stores </div>
      <div className={styles.usersContainer}>
        {allStoresData.map((user) => {
          return <Chip key={user._id} user={user}></Chip>;
        })}
      </div>
    </>
  );
};

export default StoreComponent;
