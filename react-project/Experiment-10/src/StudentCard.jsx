import React from "react";
import "./App.css";

function StudentCard({ student }) {
  return (
    <div className="card">
      <h3>{student.name}</h3>
      <p>Age: {student.age}</p>
    </div>
  );
}

export default StudentCard;
