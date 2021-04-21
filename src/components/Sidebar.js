import React, { useState, useEffect } from "react";
import styles from "../styles/components/Sidebar.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  logout,
  getToken,
} from "../services/auth";

export default function Sidebar(props) {
  var { mode } = props;

  var location = useLocation();
  var history = useHistory();

  const loc = location.pathname;

  const handleLogout = async () => {
    await logout(getToken());
    history.push("/login");
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <aside className={styles.container}>
      <img
        onClick={() => console.log("cliclado!")}
        className={styles.logo}
        src="img/DuckHealth_PNG.png"
        alt="duck"
      ></img>
      {mode !== "extended" ? <></> : extendOptions(location.pathname)}

      {loc.includes('/doctor/upload/') ? (
        <button onClick={handleGoBack} className={styles.logout}>
          <i className="fas fa-arrow-left"></i>
        </button>
      ) : (
        <button onClick={handleLogout} className={styles.logout}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      )}
    </aside>
  );
}

const extendOptions = (location) => {
  return (
    <div className={styles.extend}>
      {location !== "/admin/patients" ? (
        <div className={styles.contain}>
          <div className={styles.selectorNotActive}></div>
          <div className={styles.right}>
            <Link to="/admin/patients">
              <button className={styles.notActive}>
                <i className="fas fa-user-injured"></i>
              </button>
            </Link>
            <p className={styles.infoOff}>Pacientes</p>
          </div>
        </div>
      ) : (
        <div className={styles.contain}>
          <div className={styles.selectorActive}></div>
          <div className={styles.right}>
            <Link to="/admin/patients">
              <button className={styles.active}>
                <i className="fas fa-user-injured"></i>
              </button>
            </Link>
            <p className={styles.infoOn}>Pacientes</p>
          </div>
        </div>
      )}
      {location !== "/admin/doctors" ? (
        <div className={styles.contain}>
          <div className={styles.selectorNotActive}></div>
          <div className={styles.right}>
            <Link to="/admin/doctors">
              <button className={styles.notActive}>
                <i className="fas fa-user-md"></i>
              </button>
            </Link>
            <p className={styles.infoOff}>Médicos</p>
          </div>
        </div>
      ) : (
        <div className={styles.contain}>
          <div className={styles.selectorActive}></div>
          <div className={styles.right}>
            <Link to="/admin/doctors">
              <button className={styles.active}>
                <i className="fas fa-user-md"></i>
              </button>
            </Link>
            <p className={styles.infoOn}>Médicos</p>
          </div>
        </div>
      )}
    </div>
  );
};
