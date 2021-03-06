import React, { createContext } from "react";
import useDoctor from "./hooks/useDoctor";

const DoctorContext = createContext();

function DoctorProvider({ children }) {
  const {
    patients,
    myPatients,
    filterBy,
    clicked,
    setClicked,
    setMyPatients,
    uploadReport,
    downloadReport,
    deleteReport,
    getPatients,
    setFilterBy,
  } = useDoctor();

  return (
    <DoctorContext.Provider
      value={{
        patients,
        myPatients,
        filterBy,
        clicked,
        setClicked,
        setMyPatients,
        downloadReport,
        uploadReport,
        deleteReport,
        getPatients,
        setFilterBy,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export { DoctorContext, DoctorProvider };
