import React from "react";
import Sidebar from "../components/Sidebar";
import styles from "../styles/pages/Doctor.module.css";
import DoctorContent from '../pages/Doctor/DoctorContent';
import { DoctorProvider } from "../contexts/DoctorContext";
import { useParams } from "react-router-dom";

export default function Doctor(props) {

  const { doctorId } = useParams();
  console.log("doctorId", doctorId);

  return (
    <DoctorProvider>
      <div className={styles.container}>
        <Sidebar mode="notExtend" />
        {props.children}
      </div>
    </DoctorProvider>
  );
}
