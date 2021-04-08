import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [numDoctors, setNumDoctor] = useState(0);
  const [numPatients, setNumPatients] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    setClicked(!clicked);
    console.log("clicked");
  };

  async function getDoctors() {
    const response = await api.get("doctors/list");
    setDoctors(response.data);

    setNumDoctor(response.data.length);
  }

  async function getPatients() {
    const response = await api.get("patients/list");
    setPatients(response.data);

    setNumPatients(response.data.length);
  }

  const deleteUser = async (type, user_id) => {
    console.log("id in useAdmin:", user_id);
    if (type === "Médicos") {
      await api.delete(`doctors/del/${user_id}`);
    } else {
      await api.delete(`patients/del/${user_id}`);
    }
    setClicked(!clicked);
  };


  useEffect(() => {
    getDoctors();
    getPatients();
  }, [clicked]);

  return { numPatients, numDoctors, doctors, patients, handleAdd, deleteUser };
}
