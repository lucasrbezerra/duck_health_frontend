import React from "react";
import styles from "../styles/components/Profile.module.css";

export default function Profile(props) {
  const { mode, full_name } = props;
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h3>Olá, <span className={styles.span}>{full_name}</span></h3>
        {mode === "extended" || mode === "upload"? <h4>Médico</h4> : <h4>Paciente</h4>}
      </div>
      {mode === "extended" ? (
        <img src="/img/doctor.png" alt="doctor"></img>
      ) : (
        <img src="/img/patient.png" alt="patient"></img>
      )}
    </div>
  );
}
