import React, { useContext } from "react";
import styles from "../../styles/pages/Doctor.module.css";
import Navbar from "../../components/Navbar";
import { DoctorContext } from "../../contexts/DoctorContext";
import { getCurrentFullName } from "../../services/auth";
import ReportList from "../../components/ReportList";
import Upload from "../../components/Upload";

export default function DoctorUpload() {
  const { clicked, setClicked } = useContext(DoctorContext);

  const full_name = getCurrentFullName();

  return (
    <div className={styles.content}>
      <Navbar mode="upload" full_name={full_name} />
      <div className={styles.uploadContainer}>
        <ReportList clicked={clicked} />
        <Upload />
      </div>
    </div>
  );
}
