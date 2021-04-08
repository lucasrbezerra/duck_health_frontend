import React, { useState } from "react";
import styles from "../styles/components/AdminList.module.css";

export default function AdminList(props) {
  const { list, title, onClickAdd } = props;
  const [data] = useState(list);

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <div className={styles.info}>
          <img src="/img/patient.png" alt="paciente"></img>
          <h2>Lista de {title}</h2>
        </div>
        <button onClick={onClickAdd} className={styles.add}>
          <i className="fas fa-plus"></i>
        </button>
      </header>
      <main className={styles.listContainer}>
        {data.map(function (item, index) {
          return (
            <Card
              key={index}
              full_name={item.full_name}
              subtitle={item.subtitle}
            />
          );
        })}
      </main>
    </div>
  );
}

const Card = ({ full_name, subtitle }) => {
  return (
    <div onClick={() => console.log(`card of ${full_name}`)} className={styles.cardContent}>
      <div className={styles.profileData}>
        <h2>{full_name}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => console.log(`edit ${full_name}`)}>
          <i className="far fa-edit"></i>
        </button>
        <button onClick={() => console.log(`delete ${full_name}`)}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};
