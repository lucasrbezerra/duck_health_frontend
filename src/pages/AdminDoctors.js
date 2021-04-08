import React from "react";
import styles from "../styles/pages/Admin.module.css";
import AdminList from "../components/AdminList";
import AdminFilter from "../components/AdminFilter";
import AdminControl from "../components/AdminControl";

function AdminDoctors(props) {
  const doctors = [
    { id: 1, full_name: "Dr Hans Chucrute", subtitle: "Cardiologista" },
    { id: 2, full_name: "Dr Jason", subtitle: "Matador" },
    { id: 3, full_name: "Dr Fred Krueger", subtitle: "Cirurgião" },
    { id: 4, full_name: "Dr Hans Chucrute", subtitle: "Cardiologista" },
    { id: 5, full_name: "Dr Jason", subtitle: "Matador" },
    { id: 6, full_name: "Dr Fred Krueger", subtitle: "Cirurgião" },
    { id: 7, full_name: "Dr Hans Chucrute", subtitle: "Cardiologista" },
    { id: 8, full_name: "Dr Jason", subtitle: "Matador" },
    { id: 9, full_name: "Dr Fred Krueger", subtitle: "Cirurgião" },
  ];
  const title = "Médicos";
  const number = 25;

  const onClickAdd = () => {
    console.log("clicked in create doctor!");
  };

  return (
    <div className={styles.content}>
      <div className={styles.leftContent}>
        <AdminList title={title} list={doctors} onClickAdd={onClickAdd} />
      </div>
      <div className={styles.rightContent}>
        <AdminFilter />
        <AdminControl title={title} number={number} />
      </div>
    </div>
  );
}

export default AdminDoctors;
