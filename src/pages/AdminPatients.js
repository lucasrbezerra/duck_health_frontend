import React, { useContext } from "react";
import styles from "../styles/pages/Admin.module.css";
import AdminList from "../components/AdminList";
import AdminFilter from "../components/AdminFilter";
import AdminControl from "../components/AdminControl";
import { AdminContext } from "../contexts/AdminContext";

function AdminPatients(props) {
  const title = "Pacientes";
  const {
    patients,
    numPatients,
    handleAdd,
    deleteUser,
    userExist,
  } = useContext(AdminContext);

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList
          title={title}
          data={patients}
          handleAdd={handleAdd}
          deleteUser={deleteUser}
          userExist={userExist}
        />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter />
        <AdminControl title={title} number={numPatients} />
      </div>
    </div>
  );
}

export default AdminPatients;
