import React from "react";
import styles from "../styles/components/AdminFilter.module.css";

export default function AdminFilter() {
  return (
    <div className={styles.container}>
      <header className={styles.top}>
        <div className={styles.info}>
          <i class="fas fa-filter"></i>
          <h3>Filtros</h3>
        </div>
      </header>
      <main className={styles.content}>
        <p>Buscar por:</p>
        <h1>SearchBar here</h1>
        <p>Ordenar por:</p>
        <div className={styles.order}>
          <div className={styles.icons}>
            <div className={styles.circularSelect}></div>
            <h3>Data de Criação</h3>
          </div>
          <div className={styles.icons}>
            <div className={styles.circularSelect}></div>
            <h3>Ordem Alfabética</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
