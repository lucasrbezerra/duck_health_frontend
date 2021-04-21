import React, { forwardRef } from "react";
import styles from "../../styles/pages/Patient.module.css";
import Navbar from "../../components/Navbar";
import { getCurrentFullName } from "../../services/auth";

export default function PatientContent() {
  const full_name = getCurrentFullName();

  return (
    <div className={styles.content}>
      <Navbar full_name={full_name} />
      <main className={styles.main}></main>
    </div>
  );
}

const Card = forwardRef((props, ref) => {
  return (
    <div className={styles.card}>
      <p>Card</p>
    </div>
  );
});
