import React, { forwardRef, useRef, useContext, useEffect } from "react";
import styles from "../../styles/pages/Patient.module.css";
import Navbar from "../../components/Navbar";
import { getCurrentFullName } from "../../services/auth";
import { PatientContext } from "../../contexts/PatientContext";
import { useParams } from "react-router-dom";

export default function PatientContent() {
  const {
    reports,
    doctorOwner,
    getHistoric,
    getReports,
    downloadReport,
    filterBy,
    setFilterBy,
  } = useContext(PatientContext);

  const cardRef = useRef(null);
  const full_name = getCurrentFullName();
  const { patient_id } = useParams();

  useEffect(async () => {
    await getReports(patient_id);
  }, []);

  return (
    <div className={styles.content}>
      <Navbar
        full_name={full_name}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <main className={styles.main}>
        {reports
          .filter((item) => {
            return item.title.toLowerCase().includes(filterBy.toLowerCase());
          })
          .map((item) => {
            if (item.doctorOwner === null) getHistoric(item.id);
            return (
              <Card
                key={item.id}
                item={item}
                downloadReport={downloadReport}
                full_name={
                  item.doctorOwner === null
                    ? doctorOwner.full_name
                    : item.doctorOwner.full_name
                }
                specialty={
                  item.doctorOwner === null
                    ? doctorOwner.specialty
                    : item.doctorOwner.specialty
                }
                ref={cardRef}
              />
            );
          })}
      </main>
    </div>
  );
}

const Card = forwardRef((props, ref) => {
  const { item, full_name, specialty, downloadReport } = props;

  const downloadHandler = () => {
    const fileName = item.link;
    downloadReport(fileName);
  };

  return (
    <div ref={ref} className={styles.cardContent}>
      <div className={styles.cardData}>
        <div className={styles.cardHeader}>
          <h2 className={styles.exam}>{item.title}</h2>
        </div>
        <div className={styles.cardIcon}>
          <img src="/img/endoscpy.svg" alt="icon-medical" />
        </div>
        <div className={styles.description}>
          <h2 className={styles.name}>{full_name}</h2>
          <p className={styles.specialty}>{specialty}</p>
        </div>
      </div>
      <div className={styles.dateExam}>
        <img src="/img/calendar.svg" alt="calendar" />
        <h3>{formatDate(item.date_exam)}</h3>
      </div>
      <button onClick={() => downloadHandler()} className={styles.download}>
        <i className="fas fa-file-download"></i>
        <u>Baixar Laudo</u>
      </button>
    </div>
  );
});

function formatDate(date) {
  const newDate = new Date(date);

  const day = lessTen(newDate.getDate());
  const month = lessTen(newDate.getMonth() + 1);
  const fullyear = newDate.getFullYear();
  const hour = lessTen(newDate.getHours());
  const minute = lessTen(newDate.getMinutes());

  const dateFormated = `${day}/${month}/${fullyear} - ${hour}:${minute}`;

  return dateFormated;
}

const lessTen = (val) => (val < 10 ? "0" + val : val);
