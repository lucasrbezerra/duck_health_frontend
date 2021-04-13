import { useState, useEffect } from "react";
import api from "../../services/api";

export default function useAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [numDoctors, setNumDoctor] = useState(0);
  const [numPatients, setNumPatients] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [order, setOrder] = useState("date");
  const [filterBy, setFilterBy] = useState("");

  function sortJSON(key, arr) {
    return arr.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  async function getLoginList() {
    const response = await api.get("users/list/logins");
    return response.data;
  }

  const handleAdd = async (type, user) => {
    if (type === "Médicos") {
      await api.post("/doctors/create", {
        full_name: user.full_name,
        specialty: user.specialty,
        login: user.login.replace(/[.,/*+;'"_-]/g, ""),
        hashed_password: user.password,
      });
    } else {
      await api.post("/patients/create", {
        full_name: user.full_name,
        login: user.login.replace(/[.,/*+;'"_-]/g, ""),
        hashed_password: user.password,
      });
    }
    setClicked(!clicked);
  };

  const handleEdit = async (type, user, id) => {
    if (type === "Médicos") {
      await api.put(`/doctors/edit/${id}`, {
        full_name: user.full_name,
        specialty: user.specialty,
        login: user.login.replace(/[.,/*+;'"_-]/g, ""),
        hashed_password: user.password,
      });
    } else {
      await api.put(`/patients/edit/${id}`, {
        full_name: user.full_name,
        login: user.login.replace(/[.,/*+;'"_-]/g, ""),
        hashed_password: user.password,
      });
    }
    setClicked(!clicked);
  };

  async function getDoctors() {
    const response = await api.get("doctors/list");
    order === "alfa"
      ? setDoctors(sortJSON("full_name", response.data))
      : setDoctors(response.data.reverse());

    setNumDoctor(response.data.length);
  }

  async function getPatients() {
    const response = await api.get("patients/list");
    order === "alfa"
      ? setPatients(sortJSON("full_name", response.data))
      : setPatients(response.data.reverse());

    setNumPatients(response.data.length);
  }

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
  }, [clicked, order]);

  return {
    numPatients,
    numDoctors,
    doctors,
    patients,
    order,
    filterBy,
    setFilterBy,
    setOrder,
    getLoginList,
    handleAdd,
    handleEdit,
    deleteUser,
  };
}
