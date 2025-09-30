import React, { useState } from "react";

function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // stop if empty
    if (name.trim() === "" || age.trim() === "") return;

    // send values to parent
    onAdd(name, age);

    // clear input fields
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;
