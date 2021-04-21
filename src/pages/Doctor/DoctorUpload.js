import React, { useContext } from "react";
import styles from "../../styles/pages/Doctor.module.css";
import Navbar from "../../components/Navbar";
import { DoctorContext } from "../../contexts/DoctorContext";
import { getCurrentFullName } from "../../services/auth";
import ReportList from "../../components/ReportList";
import Upload from "../../components/Upload";
import { useParams } from "react-router-dom";

export default function DoctorUpload() {
  const {
    clicked,
    setClicked,
    filterBy,
    setFilterBy,
    uploadReport,
    deleteReport,
    downloadReport,
  } = useContext(DoctorContext);

  const full_name = getCurrentFullName();

  const { doctor_id, patient_id } = useParams();

  return (
    <div className={styles.content}>
      <Navbar
        mode="upload"
        full_name={full_name}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <div className={styles.uploadContainer}>
        <ReportList
          filterBy={filterBy}
          clicked={clicked}
          deleteReport={deleteReport}
          downloadReport={downloadReport}
        />
        <Upload
          patientId={patient_id}
          uploadReport={uploadReport}
          doctorId={doctor_id}
          clicked={clicked}
          setClicked={setClicked}
        />
      </div>
    </div>
  );
}
