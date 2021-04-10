import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [numDoctors, setNumDoctor] = useState(0);
  const [numPatients, setNumPatients] = useState(0);
  const [userExist, setUserExist] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleAdd = async (type, user) => {
    if (type === "Médicos") {
      await api.post(`/doctors/create`, {
        full_name: user.full_name,
        specialty: user.specialty,
        login: user.login,
        hashed_password: user.password,
      }).then((res) => {
        console.log("->", res.data);
        setUserExist(res.data);
      });
    } else {
      await api.post(`/patients/create`, {
        full_name: user.full_name,
        login: user.login,
        hashed_password: user.password,
      }).then((res) => {
        setUserExist(res.data[0].login);
      });
    }
    setClicked(!clicked);
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

  return { numPatients, numDoctors, doctors, patients, userExist, handleAdd, deleteUser };
}
