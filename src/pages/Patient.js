import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Patient.module.css";

export default function Patient(props) {
  return (
    <div className={styles.container}>
      <Sidebar mode="notExtend"/>
      {props.children}
    </div>
  );
}
