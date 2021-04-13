import React, { useContext } from "react";
import styles from "../../styles/pages/Admin.module.css";
import AdminList from "../../components/AdminList";
import AdminFilter from "../../components/AdminFilter";
import AdminControl from "../../components/AdminControl";
import { AdminContext } from "../../contexts/AdminContext";

function AdminPatients(props) {
  const title = "Pacientes";
  const {
    patients,
    numPatients,
    handleAdd,
    deleteUser,
    getLoginList,
    filterBy,
    setFilterBy,
    order,
    setOrder
  } = useContext(AdminContext);

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList
          title={title}
          data={patients}
          handleAdd={handleAdd}
          getLoginList={getLoginList}
          deleteUser={deleteUser}
          filterBy={filterBy}
        />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter order={order} setOrder={setOrder} filterBy={filterBy} setFilterBy={setFilterBy}/>
        <AdminControl title={title} number={numPatients} />
      </div>
    </div>
  );
}

export default AdminPatients;
