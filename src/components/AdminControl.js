import React from "react";
import styles from "../styles/components/AdminControl.module.css";

export default function AdminControl(props) {
  const { title, number } = props;
  return (
    <div className={styles.container}>
      <div className={styles.ident}>
        {title === "Médicos" ? (
          <i className="fas fa-user-injured"></i>
        ) : (
          <i className="fas fa-user-injured"></i>
        )}
      </div>
      <div className={styles.info}>
        <h2>{number}</h2>
        <p>Total de {title}</p>
      </div>
    </div>
  );
}
