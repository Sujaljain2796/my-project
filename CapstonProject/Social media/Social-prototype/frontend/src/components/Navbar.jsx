import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2>SocialApp</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#222", color: "#fff" },
  links: { display: "flex", gap: "10px" },
  link: { color: "#fff", textDecoration: "none" },
  button: { background: "#ff4444", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },
};

export default Navbar;
