// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Products List</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#282c34",
  color: "white",
  padding: "20px",
  textAlign: "center",
  fontSize: "24px",
};

export default Header;
