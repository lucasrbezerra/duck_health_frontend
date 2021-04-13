import React, { createContext } from "react";
import useAdmin from "./hooks/useAdmin";

const AdminContext = createContext();

function AdminProvider({ children }) {
  const {
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
  } = useAdmin();

  return (
    <AdminContext.Provider
      value={{
        numPatients,
        numDoctors,
        doctors,
        patients,
        order,
        filterBy,
        setFilterBy,
        setOrder,
        getLoginList,
        handleEdit,
        handleAdd,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminProvider };
