import React from "react";
import styles from "../styles/pages/Login.module.css";

export default function Login(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}
