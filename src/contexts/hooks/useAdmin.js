import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [numDoctors, setNumDoctor] = useState(0);
  const [numPatients, setNumPatients] = useState(0);
  const [clicked, setClicked] = useState(false);

  async function getLoginList(){
    const response = await api.get("users/list/logins");
    return response.data;
  }

  const handleAdd = async (type, user) => {
    if (type === "Médicos") {
      await api.post("/doctors/create", {
        full_name: user.full_name,
        specialty: user.specialty,
        login: user.login,
        hashed_password: user.password,
      });
    } else {
      await api.post(`/patients/create`, {
        full_name: user.full_name,
        login: user.login,
        hashed_password: user.password,
      });
    }
    setClicked(!clicked);
  };

  async function getDoctors() {
    const response = await api.get("doctors/list");
    setDoctors(response.data);

    setNumDoctor(response.data.length);
  };

  async function getPatients() {
    const response = await api.get("patients/list");
    setPatients(response.data);

    setNumPatients(response.data.length);
  };

  const deleteUser = async (type, user_id) => {
    if (type === "Médicos") {
      await api.delete(`doctors/del/${user_id}`).then((res) => {
        console.log(res.data);
        setClicked(!clicked);
      });
    } else {
      await api.delete(`patients/del/${user_id}`).then((res) => {
        console.log(res.data);
        setClicked(!clicked);
      });
    }
  };

  useEffect(() => {
    getDoctors();
    getPatients();
  }, [clicked]);

  return {
    numPatients,
    numDoctors,
    doctors,
    patients,
    getLoginList,
    handleAdd,
    deleteUser,
  };
}
