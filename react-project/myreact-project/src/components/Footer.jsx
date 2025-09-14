// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 My React Store. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#282c34",
  color: "white",
  padding: "10px",
  textAlign: "center",
  position: "fixed",
  bottom: "0",
  width: "100%",
};

export default Footer;
