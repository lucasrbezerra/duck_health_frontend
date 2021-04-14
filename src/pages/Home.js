import React from "react";
import styles from "../styles/pages/Home.module.css";

export default function Home(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}
