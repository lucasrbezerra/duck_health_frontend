import React, { createContext } from "react";
import usePatient from "./hooks/usePatient";

const PatientContext = createContext();

function PatientProvider({ children }) {
  const { reports, doctorOwner, filterBy, setFilterBy, getHistoric, getReports, downloadReport } = usePatient();

  return (
    <PatientContext.Provider
      value={{
        reports,
        doctorOwner,
        filterBy,
        setFilterBy,
        getHistoric,
        getReports,
        downloadReport,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export { PatientContext, PatientProvider };
