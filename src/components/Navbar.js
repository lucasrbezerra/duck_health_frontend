import React from "react";
import styles from "../styles/components/Navbar.module.css";
import Searchbar from "./Searchbar";
import Profile from "./Profile";
import { withStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useParams } from "react-router-dom";

export default function Navbar(props) {
  const { mode, myPatients, full_name, setMyPatients, filterBy, setFilterBy, getPatients } = props;

  const { doctorId } = useParams();

  const handleChange = async (event) => {
    setMyPatients(event.target.checked);
    getPatients(doctorId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        {mode === "extended" ? (
          extendNavbar({ myPatients, handleChange })
        ) : (
          <></>
        )}
        <Searchbar filterBy={filterBy} setFilterBy={setFilterBy} />
      </div>
      <Profile mode={mode} full_name={full_name} />
    </div>
  );
}

const extendNavbar = (props) => {
  const { myPatients, handleChange } = props;
  return (
    <div className={styles.extend}>
      <FormControlLabel
        control={
          <CheckRadio
            checked={myPatients}
            onChange={handleChange}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            name="checkedH"
          />
        }
      />
      <h4>Meus Pacientes</h4>
    </div>
  );
};

const CheckRadio = withStyles({
  root: {
    color: "#FFD666",
    marginLeft: "15px",
    "&$checked": {
      color: "#FFD666",
    },
  },
  checked: {},
})((props) => <Checkbox {...props} />);
