import React from "react";
import styles from "../styles/pages/Home.module.css";
import Sidebar from "../components/Sidebar";

export default function Doctor() {
  return (
    <div className={styles.container}>
      <Sidebar
        mode="extended"
        patientClick={() => console.log("patient screen here!")}
        doctorClick={() => console.log("doctor screen here!")}
      />
      <div className={styles.content}>
        <p className={styles.title}>Hello, Doctor Area</p>
      </div>
    </div>
  );
}
