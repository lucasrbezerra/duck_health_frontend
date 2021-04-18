import React, { useContext } from "react";
import styles from "../../styles/pages/Doctor.module.css";
import Navbar from "../../components/Navbar";
import { DoctorContext } from "../../contexts/DoctorContext";
import { Link, useParams } from "react-router-dom";
import { getCurrentFullName } from '../../services/auth';

export default function DoctorContent() {
  const {
    patients,
    myPatients,
    setMyPatients,
    filterBy,
    setFilterBy,
    getPatients,
  } = useContext(DoctorContext);

  const { doctorId } = useParams();
  const full_name = getCurrentFullName();


  return (
    <div className={styles.content}>
      <Navbar
        mode="extended"
        full_name={full_name}
        myPatients={myPatients}
        setMyPatients={setMyPatients}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        getPatients={getPatients}
      />

      <div className={styles.cardsContainer}>
        {patients
          .filter((item) => {
            return item.full_name
              .toLowerCase()
              .includes(filterBy.toLowerCase());
          })
          .map(function (item, index) {
            return <Card key={index} item={item} doctorId={doctorId} />;
          })}
      </div>
    </div>
  );
}

const Card = (props) => {
  const { item, doctorId } = props;
  return (
    <Link to={`/doctor/upload/${doctorId}/${item.id}`}  style={{ textDecoration: 'none' }}>
      <div className={styles.cardContent}>
        <div className={styles.head}>
          <img src="/img/quad-card-patient.jpg" alt="quads"></img>
        </div>
        <div className={styles.body}>
          <img
            src="/img/patient.png"
            alt="patient"
            className={styles.photo}
          ></img>
          <h4>{item.full_name}</h4>
          <h5>{formatCPF(item.login)}</h5>
        </div>
      </div>
    </Link>
  );
};

function formatCPF(cpf) {
  const formatedCPF =
    cpf.substr(0, 3) +
    "." +
    cpf.substr(3, 3) +
    "." +
    cpf.substr(6, 3) +
    "-" +
    cpf.substr(9, 2);

  return formatedCPF;
}
