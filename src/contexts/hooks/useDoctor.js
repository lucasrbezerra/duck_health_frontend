import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useDoctor() {
  const [patients, setPatients] = useState([]);
  const [myPatients, setMyPatients] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [clicked, setClicked] = useState(false);

  function sortJSON(key, arr) {
    return arr.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  async function getPatients(doctor_id) {
    const response = await api.get("patients/list");
    if (doctor_id !== undefined && !myPatients) {
      const responseFiltered = await api.get(`/doctors/mypat/${doctor_id}`);
      setPatients(sortJSON("full_name", responseFiltered.data));
    } else {
      setPatients(sortJSON("full_name", response.data));
    }
  }

  async function uploadReport(values, doctor_id, patient_id) {
    await api.post(`/reports/${doctor_id}/${patient_id}`, {
      title: values.title ,
      date_exam: new Date(values.date).toISOString(),
      link: "http://www.warm.com"
    })
  }

  async function deleteReport(report_id) {
    try{
      await api.delete(`reports/del/${report_id}`)
      setClicked(!clicked);
    }catch (err) {
      console.log("useDoctor: ", err);
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

  return {
    patients,
    myPatients,
    filterBy,
    clicked,
    setClicked,
    uploadReport,
    deleteReport,
    setMyPatients,
    getPatients,
    setFilterBy,
  };
}
