import React from "react";
import styles from "../styles/components/Searchbar.module.css";

export default function Searchbar(props) {
  const { filterBy, setFilterBy } = props;

  return (
    <div className={styles.searchContainer}>
      <i className="fas fa-search"></i>
      <input
        className={styles.input}
        key="search"
        value={filterBy}
        type="text"
        placeholder="Buscar por nome..."
        onChange={(e) => setFilterBy(e.target.value)}
      />
    </div>
  );
}
