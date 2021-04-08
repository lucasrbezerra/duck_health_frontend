import React, { createContext } from "react";
import useAdmin from "./hooks/useAdmin";

const AdminContext = createContext();

function AdminProvider({ children }) {
  const { numPatients, numDoctors, doctors, patients, handleAdd, deleteUser } = useAdmin();

  return (
    <AdminContext.Provider value={{ numPatients, numDoctors, doctors, patients, handleAdd, deleteUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminProvider };
