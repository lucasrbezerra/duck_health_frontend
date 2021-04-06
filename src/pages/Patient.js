import React from "react";
import styles from "../styles/pages/Home.module.css";
import Sidebar from "../components/Sidebar";

export default function Patient() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <p className={styles.title}>Hello, Patient Area</p>
      </div>
    </div>
  );
}
