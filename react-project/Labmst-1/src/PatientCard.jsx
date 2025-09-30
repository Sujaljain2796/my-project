import React from "react";

function PatientCard({ patient, onRemove }) {
  return (
    <div className="patient-card">
      <h2>{patient.name}</h2>
      <p>Disease: {patient.disease}</p>
      <button onClick={() => onRemove(patient.id)}>Remove</button>
    </div>
  );
}

export default PatientCard;
