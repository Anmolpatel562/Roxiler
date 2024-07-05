import React, { useState } from "react";
import styles from "../components_css/Chips.module.css";

const StoreChips = ({ user }) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const moreDetailsHandler = () => {
    setShowMoreDetails(true);
  };

  return (
    <div>
      <div className={styles.chipContainer}>
        <div>Name : {user.name}</div>
        <div className={styles.moreDetails} onClick={moreDetailsHandler}>
          Details
        </div>
      </div>
      {showMoreDetails ? <div className={styles.background}></div> : <></>}
      {showMoreDetails ? (
        <div className={styles.detailsContainer}>
          <div
            style={{ fontSize: "30px", fontWeight: "600", marginLeft: "1rem" }}
          >
            {user.role} Details
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formFields}>
              <label className={styles.labelText}>Name</label>
              <input type="text" className={styles.inputFields} value={user.name}/>
            </div>
            <div className={styles.formFields}>
              <label className={styles.labelText}>Email</label>
              <input type="text" className={styles.inputFields}  value={user.email}/>
            </div>
            <div className={styles.formFields}>
              <label className={styles.labelText}>Address</label>
              <input type="text" className={styles.inputFields}  value={user.address}/>
            </div>
            <div className={styles.formFields}>
              <label className={styles.labelText}>Role</label>
              <input type="text" className={styles.inputFields}  value={user.role}/>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor:"pointer",
              backgroundColor:" rgb(117, 117, 251)",
              width:"200px",
              margin:"auto",
              marginTop:"2.5rem",
              borderRadius:"10px",
              padding:".2rem",
              fontWeight:"600"
            }}
            onClick={() => setShowMoreDetails(false)}
          >
            <div>Cancel</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StoreChips;
