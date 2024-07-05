import React from 'react'
import styles from "../components_css/RatingSubmittedUser.module.css";
import Chip from "./Chips.jsx";

const RatingSubmittedUser = ({ratedUsers}) => {
  return (
    <>
      <div style={{ fontSize: "30px",fontWeight:"600" }}>Users Submitted Rating </div>
      <div className={styles.usersContainer}>
        {ratedUsers.map((user) => {
          return <Chip key={user._id} user={user}></Chip>;
        })}
      </div>
    </>
  )
}

export default RatingSubmittedUser
