import React from "react";
import styles from "../styles/components/AdminFilter.module.css";
import { withStyles } from "@material-ui/core/styles";
import { Radio, RadioGroup, FormControl } from "@material-ui/core";
import Searchbar from "../components/Searchbar";

const RadioButton = withStyles({
  root: {
    color: "var(--blue-text)",
    "&$checked": {
      color: "var(--blue-text)",
    },
  },
  checked: {},
})((props) => <Radio {...props} />);


export default function AdminFilter(props) {
  const { order, setOrder, filterBy, setFilterBy } = props;

  const handleChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.top}>
        <div className={styles.info}>
          <i className="fas fa-filter"></i>
          <h3>Filtros</h3>
        </div>
      </header>
      <main className={styles.content}>
        <p>Buscar por:</p>
        <Searchbar filterBy={filterBy} setFilterBy={setFilterBy} />
        <p>Ordenar por:</p>
        <div className={styles.order}>
          <FormControl component="fieldset">
            <RadioGroup name="orderby" value={order} onChange={handleChange}>
              <div className={styles.icons}>
                <div className={styles.group}>
                  <RadioButton
                    checked={order === "date"}
                    onChange={handleChange}
                    value="date"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "date" }}
                  />
                  <h2>Data de Cadastro</h2>
                </div>
                <div className={styles.group}>
                  <RadioButton
                    checked={order === "alfa"}
                    onChange={handleChange}
                    value="alfa"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "alfa" }}
                  />
                  <h2>Ordem Alfabética</h2>
                </div>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      </main>
    </div>
  );
}
