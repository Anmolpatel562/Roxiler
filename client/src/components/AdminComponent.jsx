import React, { useEffect, useState } from "react";
import styles from "../components_css/AdminComponent.module.css";
import { totalUser } from "../apis/noramalUser";
import { calculateTotalStores } from "../apis/storeOwner";
import { calculateUsersSubmittedRating } from "../apis/noramalUser";
import { getAllUsers } from "../apis/admin";
import { getAllNormalUsers } from "../apis/noramalUser";
import { getAllStores } from "../apis/storeOwner";
import UsersComponent from "../components/UsersComponent";
import StoreComponent from "./StoreComponent.jsx";
import RatingSubmittedUser from "./RatingSubmittedUser.jsx";

const AdminComponent = () => {
  const [fetchedData, setFetchedData] = useState({
    totalUserNo: 0,
    totalStoreNo: 0,
    usersWithRatings: 0,
  });

  const [selectedCountBox, setSelectedCountBox] = useState({
    name: "First",
    First:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    Second: "",
    Third: "",
  });

  const [allUserDetails, setAllUserDetails] = useState([]);
  const [allStoresData, setAllStoresData] = useState([]);
  const [ratedUsers, setRatedUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var totalUserNumber = await totalUser();
    var totalStore = await calculateTotalStores();
    var ratings = await calculateUsersSubmittedRating();
    const adminUsers = await getAllUsers();
    const normalUsers = await getAllNormalUsers();
    const combinedArray = adminUsers.concat(normalUsers);
    const allStores = await getAllStores();
    setAllStoresData(allStores);
    setAllUserDetails(combinedArray);
    setRatedUsers(ratings);
    if (!totalUserNumber) {
      totalUserNumber = 0;
    }
    if (!totalStore) {
      totalStore = 0;
    }
    if (ratings.length === 0) {
      ratings = 0;
    }
    setFetchedData({
      totalUserNo: totalUserNumber,
      totalStoreNo: totalStore,
      usersWithRatings: ratings.length,
    });
  };

  const handleBoxClick = (selected) => {
    if (selected === "First") {
      setSelectedCountBox({
        name: "First",
        First:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        Second: "",
        Third: "",
      });
    } else if (selected === "Second") {
      setSelectedCountBox({
        name: "Second",
        First: "",
        Second:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        Third: "",
      });
    } else {
      setSelectedCountBox({
        name: "Third",
        First: "",
        Second: "",
        Third:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
      });
    }
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.totalsContainer}>
        <div
          className={styles.totalCountBoxes}
          onClick={() => handleBoxClick("First")}
          style={{ boxShadow: selectedCountBox.First }}
        >
          <div style={{ color: "red" }} className={styles.totalUsersNumber}>
            {fetchedData.totalUserNo}
          </div>
          <div className={styles.totalUsersText}>Total Users</div>
        </div>
        <div
          className={styles.totalCountBoxes}
          onClick={() => handleBoxClick("Second")}
          style={{ boxShadow: selectedCountBox.Second }}
        >
          <div
            style={{ color: "rgb(167, 97, 5)" }}
            className={styles.totalUsersNumber}
          >
            {fetchedData.totalStoreNo}
          </div>
          <div className={styles.totalUsersText}>Total Stores</div>
        </div>
        <div
          className={styles.totalCountBoxes}
          onClick={() => handleBoxClick("Third")}
          style={{ boxShadow: selectedCountBox.Third }}
        >
          <div style={{ color: "green" }} className={styles.totalUsersNumber}>
            {fetchedData.usersWithRatings}
          </div>
          <div className={styles.totalUsersText}>Rated Users</div>
        </div>
      </div>
      <div className={styles.topRatingStoreContainer}>
        <div className={styles.allPagesDashboard}>
          {selectedCountBox.name === "First" ? (
            <UsersComponent allUserDetails={allUserDetails} />
          ) : selectedCountBox.name === "Second" ? (
            <StoreComponent allStoresData={allStoresData} />
          ) : (
            <RatingSubmittedUser ratedUsers={ratedUsers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
