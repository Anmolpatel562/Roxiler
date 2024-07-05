import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminComponent from "../components/AdminComponent";
import StoreComponent from "../components/StoreComponent";
import CreateUserComponent from "../components/CreateUserComponent";
import styles from "../pages_css/LandingPage.module.css";
import storeIcon from "../assets/store.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const [selectedFeature, setSelectedFeature] = useState({
    name: "Dashboard",
    dashboard: "rgb(192, 192, 192) 0px 0px 15px -3px",
    createUser: "",
  });

  const selectedPanelHandler = (name) => {
    if (name === "Dashboard") {
      setSelectedFeature({
        name: "Dashboard",
        dashboard: "rgb(192, 192, 192) 0px 0px 15px -3px",
        createUser: "",
      });
    } else if (name === "createUser") {
      setSelectedFeature({
        name: "createUser",
        dashboard: "",
        createUser: "rgb(192, 192, 192) 0px 0px 15px -3px",
      });
    }
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem("User");
    navigate("/loginpage", {
      state: "navigated from logout",
    });
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.sideBar}>
        <img src={storeIcon} alt="Applogo" style={{ width: "100px" }} />
        <div className={styles.featuresDiv}>
          <div
            style={{ boxShadow: selectedFeature.dashboard }}
            className={styles.features}
            onClick={() => selectedPanelHandler("Dashboard")}
          >
            ADMIN
          </div>
          <div
            style={{ boxShadow: selectedFeature.createUser }}
            className={styles.features}
            onClick={() => selectedPanelHandler("createUser")}
          >
            CREATE USER
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "#474444",
              marginBottom: "15px",
            }}
          ></div>
          <div
            style={{ cursor: "pointer", fontWeight: "600", fontSize: "18px" }}
            onClick={logoutBtnHandler}
          >
            LOGOUT
          </div>
        </div>
      </div>
      <div className={styles.mainSection}>
        {selectedFeature.name === "Dashboard" ? (
          <AdminComponent />
        ) : selectedFeature.name === "createUser" ? (
          <CreateUserComponent />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
