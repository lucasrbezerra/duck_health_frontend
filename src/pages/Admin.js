import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Admin.module.css";
import { AdminProvider } from "../contexts/AdminContext";

export default function Admin(props) {
  return (
    <AdminProvider>
      <div className={styles.container}>
        <Sidebar mode="extended" />
        {props.children}
      </div>
    </AdminProvider>
  );
}
