import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Doctor.module.css";
import { DoctorProvider } from "../contexts/DoctorContext";

export default function Doctor(props) {
  return (
    <DoctorProvider>
      <div className={styles.container}>
        <Sidebar mode="notExtend" />
        {props.children}
      </div>
    </DoctorProvider>
  );
}
