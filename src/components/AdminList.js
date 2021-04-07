import React from "react";
import styles from "../styles/components/AdminList.module.css";

export default function AdminList() {
  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div className={styles.info}>
          <img src="/img/patient.png"></img>
          <h2>Lista de Pacientes</h2>
        </div>
        <button className={styles.add}>
          <i class="fas fa-plus"></i>
        </button>
      </header>
      <main></main>
    </div>
  );
}
