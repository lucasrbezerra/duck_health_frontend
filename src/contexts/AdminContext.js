import React, { createContext } from "react";
import useAdmin from "./hooks/useAdmin";

const AdminContext = createContext();

function AdminProvider({ children }) {
  const { numPatients, numDoctors, doctors, patients, userExist, handleAdd, deleteUser } = useAdmin();

  return (
    <AdminContext.Provider value={{ numPatients, numDoctors, doctors, patients, userExist, handleAdd, deleteUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminProvider };
