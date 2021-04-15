import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useDoctor() {
  const [patients, setPatients] = useState([]);
  const [myPatients, setMyPatients] = useState(false);
  const [filterBy, setFilterBy] = useState("");

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

  useEffect(() => {
    getPatients();
  }, []);

  return {
    patients,
    myPatients,
    filterBy,
    setMyPatients,
    getPatients,
    setFilterBy,
  };
}
