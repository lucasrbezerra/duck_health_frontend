import React from "react";
import styles from "../styles/pages/Admin.module.css";
import AdminList from "../components/AdminList";
import AdminFilter from "../components/AdminFilter";
import AdminControl from "../components/AdminControl";

function AdminPatients(props) {
  const patients = [
    { id: 1, full_name: "Elliot Alderson", subtitle: "999.999.999-99" },
    { id: 2, full_name: "Lucas Ribeiro", subtitle: "000.000.000-00" },
    { id: 3, full_name: "Elliot Alderson", subtitle: "999.999.999-99" },
    { id: 4, full_name: "Lucas Ribeiro", subtitle: "000.000.000-00" },
    { id: 5, full_name: "Elliot Alderson", subtitle: "999.999.999-99" },
    { id: 6, full_name: "Lucas Ribeiro", subtitle: "000.000.000-00" },
    { id: 7, full_name: "Elliot Alderson", subtitle: "999.999.999-99" },
    { id: 8, full_name: "Lucas Ribeiro", subtitle: "000.000.000-00" },
  ];
  const title = "Pacientes";
  const number = 255;

  const onClickAdd = () => {
    console.log("clicked in create doctor!");
  };
  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList title={title} list={patients} onClickAdd={onClickAdd} />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter />
        <AdminControl title={title} number={number} />
      </div>
    </div>
  );
}

export default AdminPatients;
