import { useState } from "react";
import api from "../../services/api";

export default function useDoctor() {
  const [reports, setReports] = useState([]);
  const [doctorOwner, setDoctorOwner] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  async function getReports(patient_id) {
    await api
      .get(`patients/reports/${patient_id}`)
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log("usePatient: ", err);
      });
  }

  async function getHistoric(report_id) {
    await api
      .get(`reports/historic/${report_id}`)
      .then((response) => {
        setDoctorOwner(response.data);
      })
      .catch((err) => {
        console.log("usePatient-2:", err);
      });
  }

  function downloadReport(fileName) {
    api({
      method: "get",
      url: "http://localhost:3333/download/" + fileName,
      responseType: "blob",
      headers: {},
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return {
    reports,
    doctorOwner,
    filterBy,
    setFilterBy,
    getReports,
    getHistoric,
    downloadReport,
  };
}
