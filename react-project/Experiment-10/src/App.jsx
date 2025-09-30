import React, { useState } from "react";
import StudentCard from "./StudentCard.jsx";
import StudentForm from "./StudentForm.jsx";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", age: 20 },
    { id: 2, name: "Bob", age: 22 },
  ]);

  const addStudent = (name, age) => {
    const newStudent = {
      id: students.length + 1,
      name: name.trim(),
      age: parseInt(age, 10),
    };
    setStudents([...students, newStudent]);
  };

  return (
    <div className="app">
      <h1>Student List</h1>
      <StudentForm onAdd={addStudent} />

      <div className="card-container">
        {students.map((s) => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  );
}

export default App;
