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
    const data = new FormData();
    data.append("file", values.file[0]);
    data.append("title", values.title);
    data.append("date_exam", values.date);

    await api
      .post(`/upload/${doctor_id}/${patient_id}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response);
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

  async function deleteReport(report_id) {
    try {
      await api.delete(`reports/del/${report_id}`);
      setClicked(!clicked);
    } catch (err) {
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
    downloadReport,
    deleteReport,
    setMyPatients,
    getPatients,
    setFilterBy,
  };
}
