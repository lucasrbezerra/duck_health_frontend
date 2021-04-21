import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Patient.module.css";
import { PatientProvider } from "../contexts/PatientContext";

export default function Patient(props) {
  return (
    <PatientProvider>
      <div className={styles.container}>
        <Sidebar mode="notExtend" />
        {props.children}
      </div>
    </PatientProvider>
  );
}
