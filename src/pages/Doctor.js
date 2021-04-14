import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Doctor.module.css";

export default function Doctor(props) {
  return (
    <div className={styles.container}>
      <Sidebar mode="notExtend"/>
      {props.children}
    </div>
  );
}
