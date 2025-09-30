import React, { useState } from "react";
import PatientCard from "./PatientCard";

function App() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Nobita", disease: "Flu" },
    { id: 2, name: "Doraemon", disease: "Diabetes" },
    { id: 3, name: "Gian", disease: "Asthma" }
  ]);

  const removePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div className="app">
      <h1>Patient Records</h1>
      <div className="patient-list">
        {patients.length > 0 ? (
          patients.map((p) => (
            <PatientCard key={p.id} patient={p} onRemove={removePatient} />
          ))
        ) : (
          <p>No patients found</p>
        )}
      </div>
    </div>
  );
}

export default App;
