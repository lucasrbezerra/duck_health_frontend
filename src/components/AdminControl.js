import React from "react";
import styles from "../styles/components/AdminControl.module.css";

export default function AdminControl() {
  return (
    <div className={styles.container}>
      <div className={styles.ident}>
        <i className="fas fa-user-injured"></i>
      </div>
      <div className={styles.info}>
        <h2>289</h2>
        <p>Total de Pacientes</p>
      </div>
    </div>
  );
}
