import React from "react";
import styles from "../styles/components/AdminList.module.css";
//import api from "../services/api";
//import { AdminContext } from '../contexts/AdminContext';

export default function AdminList(props) {
  const { data, title, handleAdd, deleteUser } = props;

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div className={styles.info}>
          <img src="/img/patient.png" alt="paciente"></img>
          <h2>Lista de {title}</h2>
        </div>
        <button onClick={handleAdd} className={styles.add}>
          <i className="fas fa-plus"></i>
        </button>
      </header>
      <main className={styles.listContainer}>
        {data.map(function (item, index) {
          return (
            <Card
              key={index}
              id={item.id}
              type={item.user_class}
              full_name={item.full_name}
              subtitle={title === "Médicos" ? item.specialty : item.login}
              deleteUser={deleteUser}
            />
          );
        })}
      </main>
    </div>
  );
}

const Card = ({ id, type, full_name, subtitle, deleteUser }) => {
  return (
    <div
      onClick={() => console.log(`card of ${id}`)}
      className={styles.cardContent}
    >
      <div className={styles.profileData}>
        <h2>{full_name}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => console.log(`edit ${full_name}`)}>
          <i className="far fa-edit"></i>
        </button>
        <button onClick={() => deleteUser(type, id)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};
