import React from "react";
import styles from "../styles/pages/Admin.module.css";
import AdminList from "../components/AdminList";
import AdminFilter from "../components/AdminFilter";
import AdminControl from "../components/AdminControl";

function AdminPatients(props) {
  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter />
        <AdminControl />
      </div>
    </div>
  );
}

export default AdminPatients;
