import React, { useContext } from "react";
import styles from "../styles/pages/Admin.module.css";
import AdminList from "../components/AdminList";
import AdminFilter from "../components/AdminFilter";
import AdminControl from "../components/AdminControl";
import { AdminContext } from "../contexts/AdminContext";

function AdminDoctors(props) {
  const title = "Médicos";
  const { doctors, numDoctors, handleAdd, deleteUser, getLoginList } = useContext(
    AdminContext
  );

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList
          title={title}
          data={doctors}
          getLoginList={getLoginList}
          handleAdd={handleAdd}
          deleteUser={deleteUser}
        />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter />
        <AdminControl title={title} number={numDoctors} />
      </div>
    </div>
  );
}

export default AdminDoctors;
