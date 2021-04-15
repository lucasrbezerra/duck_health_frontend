import React, { useContext } from "react";
import styles from "../../styles/pages/Doctor.module.css";
import Navbar from "../../components/Navbar";
import { DoctorContext } from "../../contexts/DoctorContext";

export default function DoctorUpload() {

  const { myPatients, setMyPatients } = useContext(DoctorContext);
  
  return (
    <div className={styles.content}>
      <Navbar
        myPatients={myPatients}
        setMyPatients={setMyPatients}
      />
      <div className={styles.cardsContainer}>
        Upload here...
      </div>
    </div>
  );
}

