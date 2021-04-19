import React, { useState, useEffect, forwardRef, useRef } from "react";
import styles from "../styles/components/ReportList.module.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import FlipMove from "react-flip-move";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function ReportList(props) {
  const { clicked, deleteReport } = props;

  const [success, setSuccess] = useState(false);
  const [reports, setReports] = useState([]);
  const [patientOwner, setPatientOwner] = useState("");

  const { patient_id } = useParams();

  useEffect(async () => {
    async function getReportsByPatient(patient_id) {
      try {
        const response = await api.get(`patients/reports/${patient_id}`);
        const patient = await api.get(`patients/${patient_id}`);
        setReports(response.data);
        setPatientOwner(patient.data);
      } catch (err) {
        console.log("ReportList: ", err);
      }
    }

    await getReportsByPatient(patient_id);

    return () => {
      setReports([]);
      setPatientOwner("");
    };
    
  }, [clicked]);

  console.log("reports", reports);
  const refCard = useRef(null);

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <img src="/img/doctor.png" alt="médico"></img>
        <h2>Laudos de {patientOwner}</h2>
      </header>
      <main style={{ position: "relative" }} className={styles.listContainer}>
        <FlipMove>
          {reports.map(function (item, index) {
            return (
              <Card
                key={index}
                item={item}
                subtitle={item.doctorOwner.full_name}
                deleteReport={deleteReport}
                size={reports.length}
                ref={refCard}
              />
            );
          })}
        </FlipMove>
      </main>
      <Snackbar
        open={success}
        autoHideDuration={4500}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Sucesso ao enviar um laudo!
        </Alert>
      </Snackbar>
    </div>
  );
}

const Card = forwardRef((props, ref) => {
  const {
    item,
    subtitle,
    deleteReport,
    size,
    handleOpen,
    setTypeModal,
    setUserEdit,
  } = props;

  const onEdit = (item) => {
    setTypeModal("edit");
    setUserEdit(item);
    handleOpen();
  };

  return (
    <div
      onClick={() => console.log(`id: ${item.id}`)}
      className={size <= 5 ? styles.cardContent : styles.cardContentResize}
      ref={ref}
    >
      <div className={styles.profileData}>
        <h2>{item.title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.buttons}>
        <button type="submit " onClick={() => console.log("Download!")}>
          <i className="fas fa-file-download"></i>
        </button>
        <button
          type="submit"
          onClick={() => deleteReport(item.user_class, item.id)}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
});
