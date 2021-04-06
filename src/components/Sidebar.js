import React from "react";
import styles from "../styles/components/Sidebar.module.css";
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
  const { mode, patientClick, doctorClick } = props;

  return (
    <aside className={styles.container}>
      <img
        onClick={() => console.log("cliclado!")}
        className={styles.logo}
        src="img/DuckHealth_PNG.png"
        alt="duck"
      ></img>
      {mode === "extended" ? (
        extendOptions(patientClick, doctorClick)
      ) : (
        <div></div>
      )}
      <button onClick={() => console.log("logout!")} className={styles.logout}>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </aside>
  );
}

const extendOptions = (patientClick, doctorClick) => (
  <div className={styles.extend}>
    <div className={styles.bord}>
      <button className={styles.bt1} onClick={patientClick}>
        <div className={styles.selector}></div>
        <i className="fas fa-user-injured"></i>
      </button>
    </div>
    <button onClick={doctorClick}>
      <i className="fas fa-stethoscope"></i>
    </button>
  </div>
);
